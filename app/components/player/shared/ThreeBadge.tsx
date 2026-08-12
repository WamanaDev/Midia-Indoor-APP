import React, { useEffect, useRef } from "react";
import { GLView } from "expo-gl";
import { Renderer, THREE } from "expo-three";

export interface ThreeBadgeProps {
  geometry: "icosahedron" | "torus";
  color: string;
  emissive?: string;
  size: number;
  reduceMotion: boolean;
}

/**
 * Badge 3D mínimo: 1 câmera perspectiva, 1 mesh (icosaedro ou toro) com
 * MeshStandardMaterial, luz ambiente + direcional. Rotação contínua via
 * requestAnimationFrame (sem GSAP) — mesh.rotation.y avança 2π a cada 12s,
 * mesh.rotation.x avança 0.6π a cada 12s, linear, em loop infinito. Pausa se
 * `reduceMotion` for true.
 */
export function ThreeBadge({
  geometry,
  color,
  emissive,
  size,
  reduceMotion,
}: ThreeBadgeProps) {
  const reduceMotionRef = useRef(reduceMotion);
  reduceMotionRef.current = reduceMotion;
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onContextCreate = (gl: any) => {
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const camera = new THREE.PerspectiveCamera(
      50,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      100
    );
    camera.position.z = 3;

    const scene = new THREE.Scene();

    const mesh = new THREE.Mesh(
      geometry === "icosahedron"
        ? new THREE.IcosahedronGeometry(1, 0)
        : new THREE.TorusGeometry(0.8, 0.32, 16, 64),
      new THREE.MeshStandardMaterial({
        color,
        emissive: emissive ?? "#000000",
        emissiveIntensity: emissive ? 0.5 : 0,
        flatShading: geometry === "icosahedron",
      })
    );
    scene.add(mesh);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const directional = new THREE.DirectionalLight(0xffffff, 0.9);
    directional.position.set(2, 2, 2);
    scene.add(directional);

    let last = Date.now();
    const REVOLUTION_MS = 12000;

    const render = () => {
      rafRef.current = requestAnimationFrame(render);

      const now = Date.now();
      const deltaMs = now - last;
      last = now;

      if (!reduceMotionRef.current) {
        mesh.rotation.y += (deltaMs / REVOLUTION_MS) * Math.PI * 2;
        mesh.rotation.x += (deltaMs / REVOLUTION_MS) * 0.6 * Math.PI;
      }

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    render();
  };

  return (
    <GLView
      style={{ width: size, height: size }}
      onContextCreate={onContextCreate}
    />
  );
}

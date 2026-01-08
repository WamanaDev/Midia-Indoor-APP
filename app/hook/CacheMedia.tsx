// /hook/CacheMedia.ts
import * as FileSystem from "expo-file-system/legacy";

export async function downloadAndCache(
  url: string | null
): Promise<string | null> {
  if (!url) return null;
  try {
    // tenta normalizar url (algumas urls têm query strings grandes)
    const parsed = url.split("?")[0] || url;
    const rawName = parsed.split("/").pop() || "media";
    const filename = encodeURIComponent(rawName);
    const localPath = `${FileSystem.cacheDirectory}${filename}`;

    const fileInfo = await FileSystem.getInfoAsync(localPath);

    if (fileInfo.exists) {
      // já está em cache
      return fileInfo.uri;
    }

    // download
    const downloaded = await FileSystem.downloadAsync(url, localPath);
    return downloaded.uri;
  } catch (err) {
    console.log("downloadAndCache error:", err);
    return null;
  }
}

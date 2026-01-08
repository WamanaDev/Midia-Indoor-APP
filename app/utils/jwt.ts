export const parseJwt = (token: string) => {
  try {
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(atob(base64Payload));
    return payload;
  } catch (e) {
    console.error("Erro ao decodificar JWT", e);
    return null;
  }
};

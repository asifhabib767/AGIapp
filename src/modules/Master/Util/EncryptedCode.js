export function encryptCode(code) {
  return `P${code.substr(0, 4)}R${code.substr(4, 4)}P${code.substr(8, 4)}`;
}
export function decryptCode(encryptedCode) {
  return encryptedCode.replace(/\D/g, '');
}

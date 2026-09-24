import CryptoJS from 'crypto-js';
import { env } from './environment';

const MASTER_VAULT_KEY = env.VITE_VAULT_MASTER_KEY;
const BASE_SECRET = env.VITE_VAULT_BASE_SECRET;

export function getValidTimeTokens(): string[] {
  const now = new Date();
  return [-1, 0, 1].map((offset) => {
    const d = new Date(now.getTime() + offset * 60000);
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${BASE_SECRET}${hh}${mm}`;
  });
}

export function verifySuperUserPassword(inputPass: string): boolean {
  return getValidTimeTokens().includes(inputPass.trim());
}

export function encryptData(plainText: string): string {
  return CryptoJS.AES.encrypt(plainText, MASTER_VAULT_KEY).toString();
}

export function decryptData(cipherText: string): string {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, MASTER_VAULT_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText || '<Failed to Decrypt>';
  } catch (err) {
    return '<Failed to Decrypt>';
  }
}
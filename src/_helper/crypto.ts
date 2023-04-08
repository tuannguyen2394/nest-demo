/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: '../.development.env' });
import * as CryptoJS from 'crypto-js';
const securityKey = process.env.FLOOW_SECURITY_KEY || 'pDaUd8IbAohAyz6v';

export const encryptData = (data: string) => {
  const cipher = CryptoJS.AES.encrypt(data, securityKey).toString();

  return cipher;
};

export const decryptData = (encryptedData: string) => {
  const decipher = CryptoJS.AES.decrypt(encryptedData, securityKey);
  const originalText = decipher.toString(CryptoJS.enc.Utf8);

  return originalText;
};

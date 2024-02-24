import fs from 'fs';
import path from 'path';

const appDirectory = process.cwd();
const privateKeyPath = path.join(
  appDirectory,
  'src',
  'certs',
  'private_key.pem'
);
const publicKeyPath = path.join(appDirectory, 'src', 'certs', 'public_key.pem');

export const JWT_PRIVATE_KEY = fs.readFileSync(privateKeyPath);
export const JWT_PUBLIC_KEY = fs.readFileSync(publicKeyPath);

export const JWT_ACSESS_TOKEN = {
  USER_CONFIRMATION: {
    scope: 'USER_CONFIRMATION',
    expiration: '7d',
  },
  ALGORITHM: 'PS512',
};

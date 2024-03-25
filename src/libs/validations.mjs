import fs from 'fs';
import path from 'path';

const privateKeyFileName = 'private_key.pem';
const publicKeyFileName = 'public_key.pem';

const getFilePath = (fileName) => {
  const appDirectory = process.cwd();
  return path.join(appDirectory, 'src', 'certs', fileName);
};

/**
 * Verifies the existence of certificate files.
 * @returns {void}
 */
const checkCertificatesExistence = () => {
  const folderPath = getFilePath('');
  const privateFilePath = getFilePath(privateKeyFileName);
  const publicFilePath = getFilePath(publicKeyFileName);

  if (!fs.existsSync(folderPath)) {
    console.error(`❌ ${folderPath} folder doesn't exist.`);
    process.exit(1);
  }

  if (!fs.existsSync(privateFilePath)) {
    console.error(
      `❌  ${privateKeyFileName} file doesn't exist in ${folderPath}.`
    );
    process.exit(1);
  }

  if (!fs.existsSync(publicFilePath)) {
    console.error(
      `❌  ${publicKeyFileName} file doesn't exist in ${folderPath}.`
    );
    process.exit(1);
  }

  console.log('✅  The certificate files exist correctly.');
};

export default { checkCertificatesExistence };

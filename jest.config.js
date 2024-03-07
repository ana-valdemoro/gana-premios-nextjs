// PHOTO-GALLERY-API
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   setupFilesAfterEnv: ['<rootDir>/tests/bootstrap.ts'],
// };

// link: https://mikevpeeren.nl/blog/testing-nextjs-applications#testing-api-routes
const { defaults } = require('jest-config');

module.exports = {
  ...defaults,
  preset: 'ts-jest',
  verbose: true,
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};

// // other tutorial of setting jest with typepscript in Next
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1',
//   },
// };

// respuesta de chatgpt
// module.exports = {
//   // Directorios donde Jest buscará archivos de prueba
//   roots: ['<rootDir>'],
//   // Extensión de los archivos de prueba
//   testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',

//   // Módulos que manejan las importaciones de TypeScript
//   moduleNameMapper: {
//     '^next(.*)$': '<rootDir>/node_modules/next$1',
//     '^@/components(.*)$': '<rootDir>/components$1',
//     '^@/pages(.*)$': '<rootDir>/pages$1',
//   },

//   // Habilitar TypeScript para las pruebas
//   transform: {
//     '^.+\\.(ts|tsx)$': 'ts-jest',
//   },

//   // Configuración para los archivos de TypeScript
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

//   // Configuración para supertest
//   setupFilesAfterEnv: ['./jest.setup.js'],
// };

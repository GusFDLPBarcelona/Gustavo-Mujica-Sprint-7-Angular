module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['ts', 'js', 'html', 'mjs'],
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  transform: {
    '^.+\\.(ts|html)$': 'ts-jest',
    '^.+\\.mjs$': 'babel-jest',  
  },
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$)' 
  ],
  extensionsToTreatAsEsm: ['.ts'],  
  globals: {
    'ts-jest': {
      useESM: true,  
    },
  },
  moduleNameMapper: {
    '\\.(css|scss|svg)$': 'identity-obj-proxy',
  },
};

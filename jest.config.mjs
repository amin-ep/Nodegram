/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'node',
  verbose: true,
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};

export default config;

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.(t|j)s$": ['ts-jest', { diagnostics: { ignoreCodes: ['TS151001'] } }],
  }
};
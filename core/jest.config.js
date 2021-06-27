module.exports = {
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^~/(.+)': '<rootDir>/src/$1',
    '^~auto/(.+)': '<rootDir>/auto/$1',
    '^~td/(.+)': '<rootDir>/testData/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  // jest-dom の global な有効化
  setupFilesAfterEnv: ['./rtl.setup.ts'],
}

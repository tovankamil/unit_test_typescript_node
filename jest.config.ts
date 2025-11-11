import type { Config } from "@jest/types";

const baseDir = "<rootDir>/src/app/server_app/handlers";
const baseTestDir = "<rootDir>/src/app/test/server_app/handlers";
const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  moduleNameMapper: {
    "^uuid$": "<rootDir>/__mocks__/uuid.js",
  },
  collectCoverage: true,
  roots: ["<rootDir>/src"],
  transformIgnorePatterns: ["/node_modules/(?!(uuid)/)"],
  collectCoverageFrom: [`${baseDir}/**/*.ts`, `${baseDir}/**/*.js`],
  coveragePathIgnorePatterns: [`${baseTestDir}`],
  testMatch: [
    `${baseTestDir}/**/*.test.ts`,
    `${baseTestDir}/**/*.test.js`,
    `${baseTestDir}/**/*.spec.ts`,
  ],
};

export default config;

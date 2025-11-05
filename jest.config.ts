import type { Config } from "@jest/types";

const baseDir = "<rootDir>/src/app/doubles";
const baseTestDir = "<rootDir>/src/app/test/doubles";
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
  collectCoverageFrom: [`${baseDir}/**/*.ts`],
  coveragePathIgnorePatterns: [`${baseTestDir}`],
  testMatch: [`${baseTestDir}/**/*.test.ts`, `${baseTestDir}/**/*.spec.ts`],
};

export default config;

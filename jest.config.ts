import type { Config } from "@jest/types";

const baseDir = "<rootDir>/src/app/doubles";
const baseTestDir = "<rootDir>/src/app/test/doubles";
const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [`${baseDir}/**/*.ts`],
  coveragePathIgnorePatterns: [`${baseTestDir}`],
  testMatch: [`${baseTestDir}/**/*.test.ts`, `${baseTestDir}/**/*.spec.ts`],
};

export default config;

import type { Config } from "@jest/types";

const baseDir = "<rootDir>/src/app/pass_checker";
const baseTestDir = "<rootDir>/src/app/test/pass_checker";
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

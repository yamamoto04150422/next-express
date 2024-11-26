// eslint-disable-next-line
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // ここでセットアップファイルを指定

  testEnvironment: "@happy-dom/jest-environment",
};

module.exports = createJestConfig(customJestConfig);

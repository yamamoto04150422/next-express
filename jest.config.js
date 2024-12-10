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
  // playwrightとの競合を避けるために指定
  testMatch: [
    "**/*.test.tsx", // .test.tsx 拡張子のテストファイル
    "**/*.test.ts", // .test.ts 拡張子のテストファイル
  ],
};

module.exports = createJestConfig(customJestConfig);

```bash
# 必要なパッケージをインストール
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest @types/jest
# 必要に応じて
npm install --save-dev jest-environment-jsdom

# tsの場合のみ
npm install --save-dev ts-node

# 作成 以下をコピペで良い気がする
npm init jest@latest
```

```javascript
// jest.config.js

// eslint-disable-next-line
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);
```

```json
// package.json にテストスクリプトを追加
{
  "scripts": {
    "test": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## jest.setup.ts

同じ記載をまとめる役割

```
jest.setup.ts
import "@testing-library/jest-dom";

jest.config.ts
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // ここでセットアップファイルを指定
};
```

## prime reactとの依存関係

```

npm install --save-dev happy-dom
npm install --save-dev @happy-dom/jest-environment
Update jest.config.ts to use Happy DOM:

{
"testEnvironment": "@happy-dom/jest-environment"
}
npm uninstall jest-environment-jsdom

```

[issues](https://github.com/primefaces/primeng/issues/14085)

### 参考リンク

- [Zenn: Jest環境構築](https://zenn.dev/c_shiraga/articles/056e7196b41c08)
- [GitHub: Next.js + MSW + Jest Example](https://github.com/yamamoto04150422/next-msw/blob/main/jest.config.ts)

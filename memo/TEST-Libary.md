```bash
# 必要なパッケージをインストール
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest @types/jest
# 必要＿
npm install --save-dev jest-environment-jsdom

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

### 参考リンク

- [Zenn: Jest環境構築](https://zenn.dev/c_shiraga/articles/056e7196b41c08)
- [GitHub: Next.js + MSW + Jest Example](https://github.com/yamamoto04150422/next-msw/blob/main/jest.config.ts)

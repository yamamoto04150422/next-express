# Prettier 設定ガイド

## 依存関係を追加

```

prettierをプロジェクトの開発依存関係
npm install --save-dev prettier

eslintとprettierを統合
npm install --save-dev eslint-config-prettier eslint-plugin-prettier

```

### ルールを設定する

`.prettierrc`ファイルを追加

### 除外ファイルを作成

`.eslintignore`と`.prettierignore`

```
node_modules
.next
build
```

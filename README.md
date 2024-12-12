# Next.js Express プロジェクト

このプロジェクトは **Next.js** を使用して構築されたアプリケーションで、**React Hook Form** によるフォーム管理や **TanStack React Query** によるデータフェッチ機能を統合しています。また、UIコンポーネントには **PrimeReact** を採用し、スタイリングには **Styled-Components** を使用しています。

---

## 目次

1. [概要](#概要)
2. [セットアップ方法](#セットアップ方法)
3. [利用可能なスクリプト](#利用可能なスクリプト)
4. [ディレクトリ構成](#ディレクトリ構成)
5. [自動生成ファイル/型定義](#自動生成ファイル/型定義)
6. [主な依存関係](#主な依存関係)
7. [開発環境の依存関係](#開発環境の依存関係)
8. [その他のドキュメント](#その他のドキュメント)

---

## 概要

このアプリケーションの主な特徴は以下の通りです：

- **フォーム管理**：`react-hook-form` + `yup` による高効率なバリデーション。
- **データ取得とキャッシュ**：`@tanstack/react-query` によるデータの管理と最適化。
- **高品質なUI**：`primereact` を活用した美しいデザインと再利用可能なコンポーネント。
- **テスト環境**：`jest`, `@testing-library/react`, `playwright` による単体・統合・E2Eテスト。
- **UI開発支援**：`storybook` を用いた効率的なコンポーネント開発。

---

## セットアップ方法

1. リポジトリをクローンします：

   ```bash
   git clone <リポジトリURL>
   cd next-express
   ```

2. 必要な依存関係をインストールします：

   ```bash
   npm install
   ```

3. 開発サーバーを起動します：

   ```bash
   npm run dev
   ```

4. [http://localhost:3000](http://localhost:3000) にアクセスして動作を確認してください。

5. docker 起動

   ```
   docker-compose up -d
   ```

   1. [http://localhost:3000](http://localhost:3000) にアクセスして動作を確認してください。

   2. [http://localhost:8080](http://localhost:8080) にアクセスして動作を確認してください。

---

## 利用可能なスクリプト

以下のスクリプトが `package.json` に定義されています：

- **`npm run dev`**  
  開発サーバーを起動します（デフォルトはポート3000）。

- **`npm run build`**  
  本番環境用にアプリケーションをビルドします。

- **`npm start`**  
  ビルドされたアプリケーションを起動します。

- **`npm run lint`**  
  ESLint を実行してコードのリントチェックを行います。

- **`npm run test`**  
  Jest を使用してテストを実行します。

- **`npm run test:watch`**  
  テストをウォッチモードで実行します。

- **`npm run test:coverage`**  
  テストのカバレッジレポートを生成します。

- **`npm run storybook`**  
  Storybook を起動します（デフォルトはポート6006）。

- **`npm run build-storybook`**  
  Storybook をビルドします。

- **`npm run generate:swagger`**  
  OpenAPI 定義から TypeScript のクライアントコードを生成します。

- **`npm run playwright:test`**  
  e2eテストを実行します

- **`npm run playwright:test:ui`**  
  e2eテストを実行します（UI上で確認可能）

- **`npm run playwright:codegen`**  
  UI上で操作してe2eテストのテストコードを効率的に記載します

---

## ディレクトリ構成

```
.
├── src/                     # アプリケーションのソースコード
│   ├── app/                 # Next.js App Router 構造
│   │   ├── (page)/          # ルーティングページ
│   │   ├── api/             # APIエンドポイント
│   │   ├── components/      # 再利用可能なUIコンポーネント
│   │   │   ├── atoms/       # 最小単位のUIコンポーネント
│   │   │   ├── molecules/   # 複数のatomsを組み合わせたコンポーネント
│   │   │   ├── auth/        # 認証関連のコンポーネント
│   │   ├── hooks/           # カスタムフック
│   │   ├── layout.tsx       # アプリ全体のレイアウト
│   │   ├── page.tsx         # ルートページ
│   │   └── utils/           # ユーティリティ関数
│   ├── styles/              # Styled-Componentsのスタイル定義
│   └── types/               # TypeScriptの型定義
├── public/                  # 静的ファイル
├── coverage/                # テストカバレッジのレポート
├── README.md                # プロジェクトの概要と説明
├── package.json             # npmの依存関係とスクリプト
├── Dockerfile               # Docker環境構築用の設定
├── docker-compose.yml       # Docker Composeの設定
├── jest.config.js           # Jestの設定
├── next.config.ts           # Next.jsの設定
├── tsconfig.json            # TypeScriptの設定
└── CHANGELOG.md             # 変更履歴
```

---

## 自動生成ファイル/型定義

### Swagger Codegen for TypeScript Client

Swagger/OpenAPI 定義から TypeScript クライアントコードを自動生成する機能を提供しています。

### 必要なファイル

- `src/app/openApi/openapi.yml`: Swagger/OpenAPI の定義ファイル

### 使い方

#### 1. npm スクリプトを使用する場合

以下のコマンドを実行してください:

```bash
npm run generate:swagger
```

#### 2. シェルスクリプトを使用する場合

`generate-swagger.sh` を実行してください:

```bash
./sh/generate-swagger.sh
```

### 出力場所

生成された TypeScript クライアントコードは以下のディレクトリに出力されます:

```
src/app/openApi/typescript
```

## storybookのテンプレートファイル作成

```
node .storybook/generateStory.js src/app/components/atoms/actionButton/ActionButton.tsx
```

---

## 主な依存関係

- **[@tanstack/react-query](https://tanstack.com/query)**：データの取得とキャッシュ管理をサポート。
- **[react-hook-form](https://react-hook-form.com/)**：簡潔で柔軟なフォーム管理ライブラリ。
- **[yup](https://github.com/jquense/yup)**：スキーマベースのバリデーションライブラリ。
- **[primereact](https://www.primereact.org/)**：洗練されたUIコンポーネント。
- **[styled-components](https://styled-components.com/)**：CSS-in-JSスタイリングライブラリ。

---

## 開発環境の依存関係

- **[@testing-library/react](https://testing-library.com/)**：Reactコンポーネントのテストツール。
- **[jest](https://jestjs.io/)**：JavaScriptのテストフレームワーク。
- **[storybook](https://storybook.js.org/)**：UIコンポーネント開発環境。
- **[typescript](https://www.typescriptlang.org/)**：静的型付けをサポートするJavaScriptスーパーセット。
- **[playwright](https://playwright.dev/)**：E2Eテストフレームワーク。

---

## その他のドキュメント

- **`CHANGELOG.md`**  
  プロジェクトの変更履歴を記録。

- **`CONTRIBUTING.md`**  
  コードやドキュメントへの貢献方法を説明するガイドライン。

- **`LICENSE`**  
  プロジェクトのライセンス情報。

- **`docs/`**  
  API仕様やアーキテクチャ設計書など、追加のドキュメントを管理するディレクトリ。

---

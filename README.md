# Next.js Express プロジェクト

このプロジェクトは **Next.js** を使用して構築されたアプリケーションで、**React Hook Form** によるフォーム管理や **TanStack React Query** によるデータフェッチ機能を統合しています。また、UIコンポーネントには **PrimeReact** を採用し、スタイリングには **Styled-Components** を使用しています。

---

## 目次

1. [概要](#概要)
2. [セットアップ方法](#セットアップ方法)
3. [利用可能なスクリプト](#利用可能なスクリプト)
4. [ディレクトリ構成](#ディレクトリ構成)
5. [自動生成ファイル（型）](#自動生成ファイル（型）)
6. [主な依存関係](#主な依存関係)
7. [開発環境の依存関係](#開発環境の依存関係)
8. [その他のドキュメント](#その他のドキュメント)

---

## 概要

このアプリケーションは以下の主要機能をサポートしています：

- **フォーム管理**：`react-hook-form` + `yup` を用いたバリデーション
- **データ取得とキャッシュ管理**：`@tanstack/react-query`
- **UI構築**：`primereact` を用いた高品質なコンポーネント
- **テスト環境**：`jest` と `@testing-library/react` によるテストフレームワーク
- **コンポーネント開発**：`storybook` によるUI開発

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

## 自動生成ファイル（型）

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

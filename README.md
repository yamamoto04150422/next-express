---
# Next.js Express プロジェクト

このプロジェクトは **Next.js** を使用して構築されたアプリケーションで、**React Hook Form** によるフォーム管理や **TanStack React Query** によるデータフェッチ機能を統合しています。また、UIコンポーネントには **PrimeReact** を採用し、スタイリングには **Styled-Components** を使用しています。
---

## 目次

1. [概要](#概要)
2. [セットアップ方法](#セットアップ方法)
3. [利用可能なスクリプト](#利用可能なスクリプト)
4. [ディレクトリ構成](#ディレクトリ構成)
5. [主な依存関係](#主な依存関係)
6. [開発環境の依存関係](#開発環境の依存関係)
7. [その他のドキュメント](#その他のドキュメント)

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

---

以下は修正版のディレクトリ構成を反映したREADMEです：

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

## 自動生成ファイル（型）

1. **Swagger/OpenAPI ファイルをもとに TypeScript クライアントコードを生成**

   プロジェクトに含まれる `./src/app/openApi/openapi.yml` ファイルを元に、`swagger-codegen` を使って TypeScript クライアントコードを生成します。このコード生成は、以下のシェルスクリプトと Docker コンテナを利用して行います。

2. **シェルスクリプト実行**

   自動生成用のシェルスクリプト `generate-api.sh` を実行することで、API クライアントの型定義ファイルが生成されます。

   実行方法:

   ```bash
   ./sh/generate-api.sh
   ```

   これにより、./src/types/autoFile フォルダ内に TypeScript の型ファイルが出力されます

### コンテナの起動とコード生成

コンテナが起動し、API クライアントコードが指定した ./src/types/autoFile フォルダに自動的に出力されます。以下のコマンドでコンテナをビルドし、実行します。

```
docker-compose up --build
```

これにより、API クライアントの型定義や関連ファイルが ./src/types/autoFile に出力されます。

### 生成されるファイルの例

- index.ts
- api.ts
- api_test.spec.ts
- configuration.ts
- custom.d.ts
- gitignore
- swagger-codegen-ignore

これらのファイルは TypeScript クライアントコードとして利用可能です。generate-api.sh または Docker コンテナを使ってこれらを自動生成し、プロジェクトで使用することができます。

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

ご不明な点や改善案がありましたら、ぜひフィードバックをお寄せください！

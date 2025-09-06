# 📘 基本設計書

## プロジェクト概要

- プロジェクト名：Example Project
- 概要：〇〇管理システムのWebアプリケーション
- 対象ユーザー：一般ユーザー／管理者
- 使用技術：Next.js (App Router)、React、Spring Boot、MySQL

---

## 画面設計

### トップページ（`/`）

| 項目           | 内容                       |
| -------------- | -------------------------- |
| 機能           | サービス紹介・ログイン導線 |
| コンポーネント | Header, Hero, Footer       |
| 状態管理       | なし（静的）               |
| 遷移先         | `/login`, `/signup`        |

### Todo一覧ページ（`/todos`）

| 項目           | 内容                         |
| -------------- | ---------------------------- |
| 機能           | Todo一覧表示／追加／削除     |
| コンポーネント | TodoList, TodoItem, TodoForm |
| 状態管理       | Jotai で全体状態管理         |
| 遷移先         | 詳細ページ `/todos/[id]`     |

---

## API設計

| エンドポイント   | メソッド | 説明         | リクエストBody      | レスポンスBody |
| ---------------- | -------- | ------------ | ------------------- | -------------- |
| `/api/todos`     | GET      | Todo一覧取得 | なし                | `Todo[]`       |
| `/api/todos`     | POST     | Todo追加     | `{ title: string }` | `Todo`         |
| `/api/todos/:id` | DELETE   | Todo削除     | なし                | `message`      |

> 認証：JWTトークンヘッダーに含める形式

---

## DB設計（ER図）

### テーブル：todos

| カラム名   | 型           | 制約          | 説明       |
| ---------- | ------------ | ------------- | ---------- |
| id         | BIGINT       | PRIMARY KEY   | TodoのID   |
| title      | VARCHAR(255) | NOT NULL      | Todoの内容 |
| is_done    | BOOLEAN      | DEFAULT FALSE | 完了フラグ |
| created_at | TIMESTAMP    | DEFAULT now() | 作成日時   |

---

## 認証・認可

- 認証方式：JWT（アクセストークン＋リフレッシュトークン）
- 認可：全APIは認証必須、例外は `/login`, `/signup` のみ
- ロール区分：一般ユーザー／管理者（今後実装予定）

---

## システム構成・環境情報

| 項目           | 内容                                 |
| -------------- | ------------------------------------ |
| フロントエンド | Next.js 14 / TypeScript / App Router |
| バックエンド   | Spring Boot 3 / REST API             |
| DB             | MySQL 8                              |
| CI/CD          | GitHub Actions / Docker              |
| テスト         | Jest / Playwright                    |

---

## 実装予定のユースケース一覧

| ID   | ユースケース     | 概要                             |
| ---- | ---------------- | -------------------------------- |
| UC01 | Todoの一覧を表示 | ログイン後、自分のTodoを一覧表示 |
| UC02 | Todoを新規作成   | タイトル入力→追加                |
| UC03 | Todoを削除       | 削除ボタン押下→確認→削除実行     |

---

## テスト方針（概要）

- コンポーネントテスト：Jest + React Testing Library
- E2Eテスト：Playwright
- CI：mainブランチマージ時にLint + Test + Deploy実行

---

## 補足・備考

- APIレスポンスのサンプルJSONは `docs/sample-responses/` に配置
- デザインはFigma共有URL参照

# nextjs 普段意識しないが利用している内容について

## 目次

- [Next.js内部ライブラリ一覧](#nextjs内部ライブラリ一覧)
- [Next Auth](#next-auth)
- [キャッシュ戦略](#キャッシュ戦略)
  - [CSR (Client-Side Rendering)](#1-csr-client-side-rendering)
  - [SSR (Server-Side Rendering)](#2-ssr-server-side-rendering)
  - [SSG (Static Site Generation)](#3-ssg-static-site-generation)
  - [ISR (Incremental Static Regeneration)](#4-isr-incremental-static-regeneration)
  - [キャッシュ戦略まとめ](#キャッシュ戦略まとめ)
- [よくある用語まとめ（Next.js＋API関連）](#よくある用語まとめnextjsapi関連)

## Next.js内部ライブラリ一覧

| 分類                 | 使用ライブラリ・特徴                                     | 開発者が普段意識しないが使っているもの       |
| -------------------- | -------------------------------------------------------- | -------------------------------------------- |
| **バンドラー**       | `webpack`（内部使用）                                    | ページごとのビルド、依存除去など             |
| **トランスパイル**   | `Babel`                                                  | JSX / TSX を JS に変換                       |
| **型チェック**       | `TypeScript`（公式対応）                                 | tsconfigは初期セットアップで生成される       |
| **スタイル**         | CSS Modules / Sass / Tailwind対応                        | `styled-jsx`もデフォルトサポートされる       |
| **ルーティング**     | App Router（`app/`ディレクトリ） or Pages Router（旧式） | ファイルベース自動ルーティング               |
| **画像最適化**       | `next/image`（内部で Sharp や Squoosh 使用）             | 圧縮・レスポンシブ画像生成                   |
| **フォント最適化**   | `next/font`（自動サブセット）                            | Google Fontsなどを効率的に使う               |
| **コード分割**       | dynamic import + Webpack                                 | ページごとに分割して初期表示を高速化         |
| **サーバー側API**    | `app/api/` や `pages/api/`                               | Expressのような軽量APIを自前で持つ           |
| **認証機構**         | `NextAuth.js` が統合しやすい構造                         | 認証用middlewareと統合しやすい               |
| **i18n（多言語化）** | 国際化機能が公式サポートされている                       | `i18n` を `next.config.js` で設定可能        |
| **環境変数**         | `.env.local`, `.env.production` など                     | webpack経由で `process.env` にバンドルされる |
| **静的サイト出力**   | SSG / ISR（Incremental Static Regeneration）             | ビルド時 or リクエスト時に静的生成           |
| **実行環境**         | Edge Runtime / Node Runtime                              | どちらかを選べる（middlewareやAPIで）        |
| **内部キャッシュ**   | Turbopack開発中、現状は `swc`/`webpack` でキャッシュ活用 | 同じコードの再ビルドを高速化                 |

# Next Auth

npm install next-auth @types/next-auth

[公式ドキュメント](https://next-auth.js.org/getting-started/client)

# キャッシュ戦略

以下に、各レンダリング方式とキャッシュ戦略を紐づけた詳細を記載します。

---

### **1. CSR (Client-Side Rendering)**

**用途:**

- ユーザーインタラクションの多い動的なページ（リアルタイムで状態が変化するもの）。  
  例: チャットアプリ、ストリーミングサービスなど、即時データ更新が必要な場合。

**判定:**

- `"use client"` を指定する。
  - App Routerのページやコンポーネントで、クライアントサイドレンダリングを明示的に設定。

**キャッシュ戦略:**

- **Request Memoization:**
  - クライアントサイドで同じリクエストが複数回行われる場合のパフォーマンス最適化に考慮。
  - 利用例: React Query, SWR などを使用。

```tsx
"use client";

import { useEffect, useState } from "react";

export default function ChatApp() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch("/api/messages");
      const data = await response.json();
      setMessages(data);
    };
    fetchMessages();
  }, []);

  return (
    <ul>
      {messages.map((msg, index) => (
        <li key={index}>{msg.text}</li>
      ))}
    </ul>
  );
}
```

---

### **2. SSR (Server-Side Rendering)**

**用途:**

- データが頻繁に更新されるページで、ユーザーのリクエストごとに最新の情報を取得する必要がある場合。  
  例: ダッシュボード、ログインしたユーザー向けのパーソナライズされたページ。

**判定:**

- デフォルトでサーバーサイドレンダリング (SSR) になる。`dynamic = "force-dynamic"` を指定することで動的レンダリングを強制。

**キャッシュ戦略:**

- **Opt out:**
  - フルキャッシュを無効化して、リクエストごとに最新データを取得。
  - `fetch()` に `cache: "no-store"` を設定する。

```tsx
export default async function Dashboard() {
  const response = await fetch("https://example.com/api/data", {
    cache: "no-store", // キャッシュ無効化
  });
  const data = await response.json();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{data.message}</p>
    </div>
  );
}
```

---

### **3. SSG (Static Site Generation)**

**用途:**

- 更新頻度が低く、静的なコンテンツで問題ない場合。  
  例: プライバシーポリシー、会社概要ページ、ブログ記事。

**判定:**

- `dynamic = "force-static"` または、デフォルトで静的レンダリングになる。

**キャッシュ戦略:**

- **Full Route Cache:**
  - フルルートキャッシュが有効で、静的に生成されたHTMLが利用される。
  - 初回リクエスト後、再生成されるまでキャッシュが維持。

```tsx
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is a static page generated at build time.</p>
    </div>
  );
}
```

---

### **4. ISR (Incremental Static Regeneration)**

**用途:**

- 静的コンテンツに近いが、ある程度の更新頻度が必要な場合。  
  例: ニュース記事、商品リスト。

**判定:**

- `export const revalidate = n;` を設定し、`n` 秒ごとに再生成を実行。

**キャッシュ戦略:**

- **Data Cache:**
  - データフェッチ時に `next: { revalidate: n }` を利用。
  - 静的コンテンツとしてキャッシュされ、`n` 秒経過後に新しいデータが取得可能。

```tsx
export const revalidate = 10; // 10秒ごとに再生成

export default async function News() {
  const response = await fetch("https://example.com/api/news", {
    next: { revalidate: 10 },
  });
  const news = await response.json();

  return (
    <div>
      <h1>Latest News</h1>
      <ul>
        {news.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

### **キャッシュ戦略まとめ**

| **方式** | **用途**                         | **キャッシュ戦略**            | **Next.js判定**                |
| -------- | -------------------------------- | ----------------------------- | ------------------------------ |
| CSR      | ユーザー操作が頻繁な動的ページ   | Request Memoization           | `"use client"` を設定          |
| SSR      | 最新データを常に必要とするページ | Opt out (`cache: "no-store"`) | デフォルトでサーバーサイド実行 |
| SSG      | 更新頻度が極めて低い静的ページ   | Full Route Cache              | デフォルトで静的生成           |
| ISR      | 時々更新が必要な静的ページ       | Data Cache (`revalidate`)     | `revalidate` を指定            |

この構成により、それぞれのレンダリング方式とキャッシュ管理の適切な選択が可能になります

# よくある用語まとめ（Next.js＋API関連）

| 用語                                        | 説明                                                                                            |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **API (Application Programming Interface)** | アプリケーション間でデータや機能をやり取りする仕組み。HTTP経由のAPIを「Web API」と呼ぶ。        |
| **エンドポイント (Endpoint)**               | APIが提供するアクセス先のURL。例：`https://api.example.com/users`                               |
| **リクエスト (Request)**                    | クライアント（ブラウザなど）がAPIに送る要求。GET / POST などのHTTPメソッドを使う。              |
| **レスポンス (Response)**                   | APIから返されるデータ（通常はJSON形式）。                                                       |
| **ヘッダー (Header)**                       | リクエストやレスポンスに付けるメタ情報（例：APIキー、Content-Type など）。                      |
| **HTTPメソッド**                            | APIの操作種別：GET（取得）、POST（登録）、PUT（更新）、DELETE（削除）など。                     |
| **APIキー (API Key)**                       | 外部サービス利用者を識別・認証するための文字列。                                                |
| **環境変数 (.env)**                         | APIキーなどを安全に管理するための設定ファイル。Gitに含めない。                                  |
| **NextResponse**                            | Next.jsでAPIレスポンスを返すためのオブジェクト。`NextResponse.json({ message })` のように使う。 |
| **App Router**                              | `app/` ディレクトリを使った新しいルーティングシステム。ページもAPIも同じルールで構成。          |
| **API Routes (旧)**                         | `pages/api/**` に置くことでAPIを定義できる旧構文。                                              |
| **Route Handlers (新)**                     | `app/api/**/route.ts` に置くことでAPIを定義するApp Router構文。                                 |
| **Middleware**                              | APIやページにアクセスする前に実行される共通処理。認証やログなどを実装可能。                     |
| **NextResponse.redirect()**                 | APIやmiddlewareでリダイレクトを実行するための関数。                                             |
| **NextRequest**                             | Next.jsのAPIルートで受け取るリクエストオブジェクト。標準の`Request`とほぼ同等。                 |

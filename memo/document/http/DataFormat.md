# 構造化データ・フィード技術の経緯まとめ

## 🔹 Microformats / Microdata / JSON-LD

### Microformats (2005頃)

- HTMLのクラス属性などに意味を埋め込む (例: `class="vcard"`)
- 今は新規開発ではほぼ使われない
- 古いブログテーマやCMSにはまだ残っている

### Microdata (HTML5仕様)

- `itemscope` / `itemprop` 属性を使う方式
- 一時期Google推奨 → **現在は非推奨**

### JSON-LD（主流）

- `<script type="application/ld+json">` に JSON で構造化データを埋め込む
- **SEO（検索エンジン最適化）では事実上これ一択**
- リッチリザルト、パンくず、FAQ などに活用

👉 **現在の主流：JSON-LD**

---

## 🔹 RSS / Atom / JSON Feed

### RSS (2000年代前半〜)

- 最も普及したフィード形式
- ニュース、ブログ更新通知などで利用される

### Atom (2003〜)

- RSS の改良版（UTF-8統一、拡張性あり）
- 技術ブログや GitHub, Stack Overflow などでは現役
- ただし RSS ほどは普及しなかった

### JSON Feed (2017〜)

- RSS/Atomの代替として登場
- JSON形式なのでモダン環境（SPA, モバイルアプリ）と相性良い
- 徐々に利用され始めているが、RSSの牙城はまだ強い

👉 **現在の主流：RSS が依然強いが、モダン開発では JSON Feed が注目**

---

## 🔹 使用ケースまとめ

| 技術         | 使用ケース例                           | 現在の立ち位置      |
| ------------ | -------------------------------------- | ------------------- |
| Microformats | 古いブログテーマ / CMS                 | ほぼレガシー        |
| Microdata    | HTML5時代の構造化データ                | 非推奨              |
| JSON-LD      | SEO, リッチリザルト, パンくず, FAQ表示 | ✅ 主流             |
| RSS          | ニュースサイト, ブログ更新通知         | ✅ 主流（広く利用） |
| Atom         | GitHub通知, 技術ブログ, 開発者向けAPI  | ニッチだが現役      |
| JSON Feed    | SPA/モバイルアプリ用の更新通知         | 新しめ・注目株      |

---

## 👉 まとめ

- **構造化データ** → JSON-LD が主流
- **フィード** → RSS が主流、Atomは一部、JSON Feedが新興

---

# JSON-LD と JSON Feed の違い

## JSON-LD

- **正式名称**: JSON for Linked Data
- **目的**: データの意味や関係性を記述し、機械が理解できる形で提供する。
- **主な用途**:
  - 構造化データ（SEO、リッチスニペット）
  - セマンティックウェブ
- **特徴**:
  - `@context` や `@type` を使ってデータの意味を定義。
  - データ間のリンクを表現可能。
- **例**:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "John Doe",
    "jobTitle": "Software Engineer"
  }
  ```

---

## JSON Feed

- **正式名称**: JSON Feed
- **目的**: RSSやAtomの代替として、Webサイトの更新情報を配信する。
- **主な用途**:
  - ブログやニュースサイトのフィード配信。
  - ポッドキャストのエピソード配信。
- **特徴**:
  - RSSやAtomのXML形式をJSON形式に置き換えたもの。
  - シンプルで軽量。
- **例**:
  ```json
  {
    "version": "https://jsonfeed.org/version/1",
    "title": "My Blog",
    "home_page_url": "https://example.com/",
    "items": [
      {
        "id": "1",
        "title": "First Post",
        "url": "https://example.com/first-post"
      }
    ]
  }
  ```

---

## 主な違い

| 特徴             | JSON-LD                            | JSON Feed                              |
| ---------------- | ---------------------------------- | -------------------------------------- |
| **目的**         | データの意味や関係性を記述する     | Webサイトの更新情報を配信する          |
| **用途**         | 構造化データ、セマンティックウェブ | フィード配信（ブログ、ニュースなど）   |
| **データの内容** | 意味論的なデータ（Linked Data）    | 記事やエピソードのリスト               |
| **フォーマット** | `@context` や `@type` を使用       | シンプルなJSON構造                     |
| **主な利用者**   | 検索エンジン、セマンティックウェブ | ブログ、ニュースサイト、ポッドキャスト |

---

## まとめ

- **JSON-LD**: データの意味や関係性を記述するためのフォーマット。主にSEOやセマンティックウェブで使用。
- **JSON Feed**: RSSやAtomの代替として、Webサイトの更新情報を配信するためのフォーマット。
- **使い分け**: JSON-LDは「データの意味を伝える」、JSON Feedは「更新情報を配信する」用途で使われる。

# Atom vs AtomPub

## ✅ テキストまとめ

### Atom (Atom Syndication Format)

- **役割**: Webサイトの更新通知を配信するフォーマット（XMLベース）
- **中身**: 記事タイトル・本文・リンク・日付など
- **使用例**: ブログフィード、ニュースサイト、GitHubリリース、ポッドキャスト
- 👉 **「読み取り専用（サイトの更新を購読する）」**

---

### AtomPub (Atom Publishing Protocol)

- **役割**: Atomフィードを使って記事やエントリを作成/更新/削除するためのAPIプロトコル
- **中身**: HTTP＋Atom（XML）
  - `GET` → 記事取得
  - `POST` → 新規記事作成
  - `PUT` → 記事更新
  - `DELETE` → 削除
- **使用例（歴史的）**: WordPress/Bloggerの投稿API、GoogleのGData API
- 👉 **「書き込み・編集もできる（双方向のやりとり）」**

## ✅ 現在の立ち位置

- **Atom** → 一部サービスでまだ使われる（GitHub通知, ポッドキャスト）
- **AtomPub** → ほぼ使われない（REST/JSON APIに置き換え済み）

---

## 👉 まとめ

- **Atom** = フィード（通知用）
- **AtomPub** = Atomを使ったAPI（書き込み編集もできる）

現在、どちらも **歴史的技術** で、実務では **JSON Feed & REST API** が主流。

---

## ✅ 「今からサービスに導入するなら？」

AtomやAtomPubは不要。代わりに以下を採用するのが現実的:

- **JSON Feed** → フィード配信
- **REST/GraphQL API** → データの作成・更新・削除

# 技術の流れ：AtomPubからREST/GraphQLへ

## 1. 当時（AtomPubの時代）

- **データのやりとり**: XML が主流
- **AtomPub**: 「記事データを Atom(XML) でやりとりする」仕組み
- **APIの形式**: XML形式でやりとりが普通

---

## 2. その後（JSON時代へ）

- **JSONの登場**:
  - 軽量＆読みやすい
  - XMLよりシンプル
  - JavaScriptとの相性が抜群
- **普及**: Web API のデータフォーマットは JSON が標準に
- 👉 **「XMLベースの AtomPub はもう古い」となった**

---

## 3. RESTとGraphQLの登場

### REST API

- **仕組み**: HTTP の `GET` / `POST` / `PUT` / `DELETE` を使ってリソースを操作
- **データ形式**: JSON が標準的
- **普及**: 今のWebアプリ・スマホアプリのAPIのほとんどがこれ

### GraphQL

- **特徴**:
  - Facebookが作ったクエリ言語ベースのAPI
  - クライアントが「欲しいデータだけ」を指定して取得できる
- **データ形式**: JSON 形式で返ってくる

---

## 4. まとめると

- **AtomPub** = 「XMLでやりとりするRESTっぽいAPI」
- **REST/GraphQL** = 「JSONでやりとりする現代のAPI」

---

## 技術の流れ

1. **XML時代**: AtomPub（XMLベースのAPI）
2. **JSON時代**: REST API（JSONが標準）
3. **クエリ時代**: GraphQL（柔軟なデータ取得）

```

XML時代
   ↓
AtomPub (XMLベースAPI)
   ↓
REST API (JSONベース)
   ↓
GraphQL (JSONベース, 柔軟な取得)


```

つまり「今は XML＋AtomPub はほぼ消えて、
JSON＋REST/GraphQL が主流になった」という意味です。

### 補足

2000年代前半は SOAP / XML-RPC みたいな重たいXMLベースのAPIが主流

独自仕様も多く、実装コストが高かった

そこで「もっとシンプルに、ブログ記事とかを投稿できるAPIが欲しい」というニーズがあった

👉 そこで出てきたのが AtomPub (Atom Publishing Protocol)

`Atomフィード（XML）`をデータ形式に使い、

HTTPメソッド（GET/POST/PUT/DELETE） を操作に割り当てる

「ブログ記事の作成・更新・削除」を統一的にできるようになった

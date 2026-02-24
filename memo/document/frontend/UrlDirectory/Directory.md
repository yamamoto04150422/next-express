# URL構造 チートシート（実務向け）

画面サンプル

```
users.    # 一覧画面
users/123 # 個別登録画面
```

## URLの基本構造

```
[プロトコル]://[ホスト]/[パス]/[動的パス]?クエリ=値
```

例

```
https://example.com/contract/workCompletedList/123?status=registration&sort=desc
```

---

## ① プロトコル（通信方法）

```
https://
```

### 意味

サーバーとどの方法で通信するか

### 主な種類

| プロトコル | 内容                     |
| ---------- | ------------------------ |
| http       | 暗号化なし               |
| https      | 暗号化あり（現在の標準） |

基本は **https** を使用

---

## ② ホスト（ドメイン）

```
example.com
```

### 意味

どのサーバーへアクセスするか

### 例

```
google.com
amazon.co.jp
```

---

## ③ パス（リソースの場所）

```
/contract/workCompletedList
```

### 意味

サーバーの中の機能・画面・APIの場所

### 例

```
/users
/products
/orders
```

### Next.jsとの対応

```
app/contract/workCompletedList/page.tsx
```

---

## ④ 動的パス（Path Parameter）

```
/123
```

### 意味

特定のリソースID

### 例

```
/users/10
/orders/999
```

### Next.js（App Router）

```
app/contract/workCompletedList/[id]/page.tsx
```

---

## ⑤ クエリパラメータ（検索・条件）

```
?status=registration&sort=desc
```

### 意味

検索条件・表示条件

### 例

| キー   | 内容       |
| ------ | ---------- |
| status | 状態で絞る |
| sort   | 並び順     |

### 特徴

- 複数指定可能
- optional（なくてもよい）
- 順番は意味を持たない

---

## Path と Query の違い

### Path Parameter

「何を取得するか」

```
/users/10
```

| 特徴 | 内容         |
| ---- | ------------ |
| 必須 | yes          |
| 用途 | リソース特定 |
| REST | 中心         |

---

### Query Parameter

「どう取得するか」

```
/users?sort=desc
```

| 特徴   | 内容           |
| ------ | -------------- |
| 必須   | no             |
| 用途   | フィルタ・検索 |
| UI依存 | 高い           |

---

## 日本語解釈

```
# example.comのサイトで
https://example.com

# 契約の完了一覧機能を利用
/contract/workCompletedList

# IDが123のデータを取得
/123

# 登録状態で絞る
?status=registration

# 降順で表示
&sort=desc
```

## 実務のREST設計

### 良い

```
GET /contracts/123
GET /contracts?status=active
```

### 悪い

```
GET /getContractById?id=123
```

---

## ■ 設計ルール（現場で使える）

### ① Pathは主キー

- ID
- UUID
- 一意な値

### ② Queryは検索条件

- UIの状態
- ソート
- フィルタ

### ③ URLは短くシンプル

### ④ 動詞は使わない

```
❌ getUsers
⭕ users
```

---

## ■ よくある設計アンチパターン

| NG                | 理由         |
| ----------------- | ------------ |
| getXXX            | RESTでない   |
| 多すぎるQuery     | 複雑化       |
| IDをQueryに入れる | 一貫性がない |

---

## フロント設計のポイント

### 状態はQueryに持たせる

例

```
?page=1
&sort=asc
&filter=active
```

メリット

- URL共有可能
- 再現性が高い
- SEO
- ブラウザ戻る対応

---

## まとめ

### URLは以下の役割

| 要素       | 役割     |
| ---------- | -------- |
| プロトコル | 通信方法 |
| ホスト     | サーバー |
| パス       | 機能     |
| 動的パス   | ID       |
| クエリ     | 条件     |

Path = データ
Query = 状態

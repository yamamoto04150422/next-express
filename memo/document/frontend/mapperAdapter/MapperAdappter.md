# SPA設計まとめ（Domain / Mapper / Adapter）

## 1. Domainとは

Domain（ドメイン）とは、`システムが本当に扱うべき「意味のあるデータ」や「業務の概念」`のこと。

簡単に言うと：

- UIやAPIに依存しない
- ビジネスとして正しい形
- システムの真実（Single Source of Truth）

例：

```ts
status: "active";
price: 1000;
startDate: "2026-02-21";
```

これは「表示」ではなく、
**ロジック・計算・検索・API送信に使える形**。

---

## 2. UI / Domain / API の違い

SPAではこの3つがズレることが多い。

| 層     | 役割               | 例                      |
| ------ | ------------------ | ----------------------- |
| UI     | ユーザー操作・表示 | "有効", "1,000円"       |
| Domain | ビジネスモデル     | "active", 1000          |
| API    | 外部通信           | status_code, snake_case |

このズレを解決するのが mapper / adapter。

---

## 3. 入力・検索条件はDomain寄せ

### なぜ？

検索条件は「表示」ではなく、

- APIに送る
- バリデーションする
- ロジックに使う

つまり、
**Domainの形で管理する必要がある。**

---

### 例：ステータス検索

#### UI

```ts
{ label: "有効", value: "active" }
```

#### Domain（state）

```ts
status: "active";
```

labelは保持しない。

理由：

- 多言語対応
- API変更に強い
- ロジックで使える

---

## 4. Mapper / Adapter の役割

### 4.1 UI → Domain（Mapper）

UI入力をDomainへ変換。

```ts
function uiToDomain(form) {
  return {
    status: form.status.value,
  };
}
```

これを「Domain寄せ」という。

---

### 4.2 Domain → API（Adapter）

```ts
function domainToApi(domain) {
  return {
    status_code: domain.status,
  };
}
```

API仕様の差を吸収。

---

### 4.3 API → Domain（Adapter）

```ts
function apiToDomain(res) {
  return {
    status: res.status_code,
  };
}
```

---

## 5. 表示（View）はDomainを整形するだけ

表示はDomainをそのまま使い、フォーマットだけ行う。

```tsx
body={(row) => formatCurrency(row.price)}
```

対象：

- 日付フォーマット
- カンマ
- 通貨
- 表示ラベル

これはロジックに影響しない。

---

## 6. SPAの全体フロー

```
UI
↓ mapper
Domain
↓ adapter
API
```

レスポンス：

```
API
↓ adapter
Domain
↓ View整形
UI
```

---

## 7. 判断フレーム

迷ったらこの3つ。

1. ユーザーが入力する？ → Domain
2. APIに送る？ → Domain
3. 表示だけ？ → View

---

## 8. まとめ

- Domainは「業務として正しいデータ」
- StateはDomainを保持
- UIとAPIの差はmapper / adapterで吸収
- 表示フォーマットはViewに閉じ込める

この分離により：

- API変更に強い
- UI変更に強い
- テストしやすい
- 保守性が高い

SPAではこの責務分離が設計のコアになる。

# TypeScript ユーティリティ型について

## 目次

- [構文と意味と結果](#構文と意味と結果)
- [type ofについて](#type-ofについて)
  - [サンプル](#サンプル)
- [TypeScript の union（ユニオン）](#typescript-の-unionユニオン)

## 構文と意味と結果

```ts
const Status = {
  APPROVAL: "approval",
  REGISTRATION: "registration",
} as const;

// ValueOf ユーティリティ型
type ValueOf<T> = T[keyof T];
```

| 構文                                   | 意味                                                    | 結果                                                                        |                 |
| :------------------------------------- | :------------------------------------------------------ | :-------------------------------------------------------------------------- | --------------- |
| `Status`                               | 値（オブジェクト）                                      | `{ APPROVAL: "approval", REGISTRATION: "registration" }`                    |                 |
| `typeof Status`                        | 値から型を作る                                          | `{ readonly APPROVAL: "approval"; readonly REGISTRATION: "registration"; }` |                 |
| `keyof typeof Status`                  | 型のキー名をUnion型で取得                               | `"APPROVAL"                                                                 | "REGISTRATION"` |
| `(typeof Status)[keyof typeof Status]` | そのキーに対応する値の型のUnion                         | `"approval"                                                                 | "registration"` |
| `ValueOf<typeof Status>`               | 上の式を汎用化したもの。オブジェクトの値のUnion型を取得 | `"approval"                                                                 | "registration"` |

> (typeof Status)[keyof typeof Status] と ValueOf<typeof Status> は 同じ意味 です。
> ValueOf は毎回長い式を書かずに済む便利なラッパーです

```ts
// enum っぽく型安全に扱える
export type StatusType = ValueOf<typeof Status>;
// → "approval" | "registration"

// 個別に型指定も可能
export type KKG01012StatusType =
  | typeof Status.APPROVAL
  | typeof Status.REGISTRATION;
```

## type ofについて

JavaScriptとTypeScriptで意味が異なる

### サンプル

javascript

> 実行時の値の型を文字列で返す

```js
const name = "Taro";
console.log(typeof name); // 👉 "string"
```

typescript

> 値の型を型として取り出す

```ts
const Status = {
  APPROVAL: "approval",
  REGISTRATION: "registration",
} as const;
```

## TypeScript の union（ユニオン）

ユニオン型は enum の代わりにもよく使われます。

`「 or の集合」`

```ts
type Fruit = "apple" | "banana" | "orange";
```

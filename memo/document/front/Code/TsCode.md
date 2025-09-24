# JS 基礎メモ

忘れがちな内容を示す。

## 目次

- [定数](#定数)
- [論理演算子](#論理演算子)
  - [論理積 &&](#論理積-)
  - [論理和 \|\|](#論理和-)
  - [オプショナルチェイニング ?.](#オプショナルチェイニング-)
- [ネストしたオブジェクト](#ネストしたオブジェクト)
  - [配列二アクセス](#配列二アクセス)
- [アロー関数とオブジェクト](#アロー関数とオブジェクト)
- [デバッグ](#デバッグ)
- [配列](#配列)
- [オブジェクト](#オブジェクト)
- [スプレッド構文](#スプレッド構文)
  - [配列コピー](#配列コピー)
- [参照コピー](#参照コピー)
- [配列コピー vs 参照コピー](#配列コピー-vs-参照コピー)
- [配列結合](#配列結合)
- [オブジェクトコピー](#オブジェクトコピー)
- [残余引数 (Rest parameter)](#残余引数-rest-parameter)
- [分割代入](#分割代入)
- [連想配列（オブジェクト](#連想配列オブジェクト)
- [template.matchAll](#templatematchall)
- [template.replace](#templatereplace)
  - [{{index}} がそのまま残るケース](#index-がそのまま残るケース)
- [型ガード](#型ガード)
  - [型ガードなしの場合](#型ガードなしの場合)
  - [型ガードありの場合](#型ガードありの場合)
  - [使用例](#使用例)
  - [まとめ](#まとめ)

# 定数

よく利用する記載

```ts
export const Status = {
  APPROVAL: "approval",
  REGISTRATION: "registration",
} as const;

export type StatusType = (typeof Status)[keyof typeof Status];

export type bulkGroupEstimateListStatusType = Extract<
  StatusType,
  "registration" | "approval"
>;
```

## 論理演算子

論理積と論理和について

### 論理積 &&

- 左から順に評価していき`falsy`があればその値を返す
- falsy がなければ最後の値を返す

```ts
const a = "1" && "3"; // "3"   → "1" は truthy なので次の値 "3" を返す
const b = null && "53"; // null  → null は falsy なのでそこで返す
const c = 0 && "ok"; // 0     → 0 は falsy なのでそこで返す
```

_falsy 値一覧_

```
false, 0, -0, 0n (BigInt), "", null, undefined, NaN
```

### 論理和 ||

- 左から順に評価していき、`truthy` があればその値を返す
- truthy がなければ最後の値を返す

```ts
const a = "1" || "3"; // "1"   → 最初から truthy
const b = null || ""; // ""    → 両方 falsy なので最後の ""
const c = null || "ok"; // "ok"  → "ok" が最初の truthy
```

_よく使う: デフォルト値_

```ts
const name = user.name || "ゲスト";
```

### オプショナルチェイニング ?.

- プロパティや関数が存在しない場合に エラーを出さずに undefined を返す
- && の存在チェックをより安全・シンプルに書ける

過去

```rs
const user = null;

// NG: user が null だとエラーになる
// console.log(user.name); // ❌ TypeError

// 回避するには && を使っていた
const name = user && user.name; // null
```

現在

```ts
const user = null;

// プロパティが無ければ undefined を返す
const name = user?.name; // undefined
```

## ネストしたオブジェクト

```ts
const user = { profile: { address: { city: "Osaka" } } };

console.log(user.profile?.address?.city); // "Osaka"
console.log(user.profile?.phone?.number); // undefined（エラーにならない）
```

### 配列二アクセス

```ts
const users = [{ name: "Taro" }];

console.log(users[0]?.name); // "Taro"
console.log(users[1]?.name); // undefined
```

# アロー関数とオブジェクト

オブジェクトを返す場合は () が必要（ブロックと区別するため）

```ts
// ❌ NG
const a = (x) => {
  work: x;
};

// ⭕ OK
const a = (x) => ({ work: x });
```

# デバッグ

```ts
debugger; // DevTools で処理を止める
```

# 配列

```ts
const arr = ["タイトル", "内容"];

const arrFnc = ([title, content]) => {
  console.log(title, content);
};
arrFnc(arr); // タイトル 内容
```

# オブジェクト

```ts
const ob = { title: "タイトル", content: "内容" };

const fnOb = ({ title, content }) => {
  console.log(title, content);
};
fnOb(ob); // タイトル 内容
```

# スプレッド構文

## 配列コピー

```ts
let arr = [1, 2, 3];
let newArr = [...arr];

console.log(arr === newArr); // false （別物）
```

# 参照コピー

```ts
let newArr1 = arr;
console.log(arr === newArr1); // true （同じ参照）
```

# 配列コピー vs 参照コピー

```ts
let arr = [1, 2, 3];

// 参照コピー（同じ箱を指す）
let refArr = arr;
refArr[0] = 99;
console.log(arr); // [99, 2, 3]
console.log(refArr); // [99, 2, 3]

// 配列コピー（新しい箱を作る）
let copyArr = [...arr];
copyArr[0] = 1;
console.log(arr); // [99, 2, 3]
console.log(copyArr); // [1, 2, 3]
```

# 配列結合

```
let arr1 = [6, 7, 8];
let merged = [...arr, ...arr1, 9]; // [1,2,3,6,7,8,9]
```

# オブジェクトコピー

```
const ob = { name: "名前", age: 22 };
const newOb = { ...ob };

newOb.name = "名前２";
console.log(ob);    // { name: "名前", age: 22 }
console.log(newOb); // { name: "名前２", age: 22 }
```

# 残余引数 (Rest parameter)

```
const restA = (n, ...argA) => {
  console.log(argA);
};

restA(1, 2, 3); // [2, 3]
```

# 分割代入

```
// 配列
const [first, second] = [10, 20, 30];
console.log(first); // 10

// オブジェクト
const { title, content } = { title: "A", content: "B" };
console.log(title); // A
```

# 連想配列（オブジェクト

- キーと値の組み合わせ」を持つデータ構造のこと

```ts
const MessageId = {
  CM000001W: "必須入力項目です",
  CM000002W: "{0}より大きい数値を入力してください",
  CM000028W: "{0}行目：{1}は必須入力項目です",
} as const;

const id = "CM000002W"; // ← キー（メッセージID）
const template = MessageId[id]; // "{0}より大きい数値を入力してください"

function getTemplate(id: keyof typeof MessageId): string {
  return MessageId[id];
}
```

# template.matchAll

- テンプレート文字列の中から {0}, {1}, {2} のような プレースホルダ番号をすべて抽出する処理。

```ts
const template = "{0}行目：{1}は{2}より大きい数値を入力してください";

const placeholders = [...template.matchAll(/\{(\d+)\}/g)].map((m) =>
  Number(m[1])
);
console.log(placeholders); // [0, 1, 2]
```

# template.replace

```ts
const template = "{0}行目：{1}は必須入力項目です";
const replace = [3, "金額"];

const result = template.replace(/\{(\d+)\}/g, (_, index) => {
  const argIndex = Number(index);
  return replace[argIndex] !== undefined
    ? String(replace[argIndex]) // 値があれば置換
    : `{${index}}`; // なければそのまま残す
});

// => "3行目：金額は必須入力項目です"
```

## {${index}} がそのまま残るケース

```ts
const template = "{0}行目：{1}は必須入力項目です";
const replace = [3]; // 引数が1つしかない

結果: "3行目：{1}は必須入力項目です";
```

# 型ガード

```ts
type MessageCode = SingleMessageCode | OtherMessageCode;

const SingleMessages: Record<SingleMessageCode, string> = {
  /* ... */
};
```

- MessageCode: 全部のメッセージコードをまとめた型
- SingleMessageCode: その一部を切り出した型
- SingleMessages: SingleMessageCode をキーに持つオブジェクト

## 型ガードなしの場合

```ts
function isSingleMessage(code: MessageCode) {
  return code in SingleMessages;
}
```

- 戻り値型は**boolean**
- TypeScript は「true の場合に **code** が **SingleMessageCode** になる」と理解できない
- そのため if (isSingleMessage(code)) の中でも code はまだ MessageCode 扱い → エラーになる

## 型ガードありの場合

```ts
function isSingleMessage(code: MessageCode): code is SingleMessageCode {
  return code in SingleMessageCode;
}
```

- code is SingleMessageCode は ユーザー定義型ガード
- 「この関数が true を返した場合、code は SingleMessageCode 型として扱ってよい」と TypeScript に伝える役割

## 使用例

```ts
function handleMessage(code: MessageCode) {
  if (isSingleMessage(code)) {
    // ここでは code は SingleMessageCode 型として扱える
    console.log("Single:", code);
    console.log(SingleMessages[code]);
  } else {
    // ここでは SingleMessageCode 以外と推論される
    console.log("Other:", code);
  }
}
```

## まとめ

if 文の中で型を絞りたいなら、code is XXX を戻り値型に書いて型ガードにする

「実際の返り値は boolean。だけど code is SingleMessageCode を書くことで、if文内で型を絞れるようにしている」

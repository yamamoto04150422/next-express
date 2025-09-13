# JS 基礎メモ

忘れがちな内容を示す。

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

## 参照コピー

```ts
let newArr1 = arr;
console.log(arr === newArr1); // true （同じ参照）
```

## 配列コピー vs 参照コピー

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

## 配列結合

```
let arr1 = [6, 7, 8];
let merged = [...arr, ...arr1, 9]; // [1,2,3,6,7,8,9]
```

## オブジェクトコピー

```
const ob = { name: "名前", age: 22 };
const newOb = { ...ob };

newOb.name = "名前２";
console.log(ob);    // { name: "名前", age: 22 }
console.log(newOb); // { name: "名前２", age: 22 }
```

## 残余引数 (Rest parameter)

```
const restA = (n, ...argA) => {
  console.log(argA);
};

restA(1, 2, 3); // [2, 3]
```

## 分割代入

```
// 配列
const [first, second] = [10, 20, 30];
console.log(first); // 10

// オブジェクト
const { title, content } = { title: "A", content: "B" };
console.log(title); // A
```

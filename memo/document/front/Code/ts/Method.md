# 目次

1. [メソッド一覧](#メソッド一覧)
2. [引数の組み合わせ](#引数の組み合わせ)
3. [戻り値の組み合わせ](#戻り値の組み合わせ)
4. [オーバーロード](#オーバーロード)
5. [デフォルト引数](#デフォルト引数)
6. [可変長引数](#可変長引数)
7. [静的メソッド](#静的メソッド)
8. [インスタンスメソッド](#インスタンスメソッド)
9. [その他の組み合わせ例](#その他の組み合わせ例)
10. [便利テク & パターン集](#便利テク--パターン集)
    - [filter → map](#filter--map)
    - [map → filter](#map--filter)
    - [flatMap / map → flat](#flat--flatmap)
    - [filter → some / every](#filter--someevery)
    - [reduce 応用](#reduce応用)
    - [forEach 注意点](#foreach注意点)
11. [実務サンプル](#実務サンプル)
12. [mapとflatMapの違い](#mapとflatMapの違い)

---

# メソッド一覧

大量データでは `find, findIndex, some, every` のように途中終了できるメソッドが有効。  
加工には `map, filter, reduce, flatMap` を組み合わせて使う。

| メソッド      | 使い方例                         | 主な目的                         | 戻り値            | 終了タイミング | 大量データ時の考慮 | 特徴       |
| ------------- | -------------------------------- | -------------------------------- | ----------------- | -------------- | ------------------ | ---------- |
| **find**      | `arr.find(x => x.id === 1)`      | 条件に一致する最初の要素         | 要素 or undefined | 一致で終了     | 途中終了できる     | 1件取得    |
| **findIndex** | `arr.findIndex(x => x.id === 1)` | 条件に一致する最初のインデックス | 数値 or -1        | 一致で終了     | 途中終了できる     | index 取得 |
| **map**       | `arr.map(x => x * 2)`            | 要素変換して新しい配列           | 新しい配列        | 最後まで       | 全件処理           | 変換       |
| **filter**    | `arr.filter(x => x.active)`      | 条件抽出                         | 新しい配列        | 最後まで       | 全件処理           | 抽出       |
| **reduce**    | `arr.reduce((a,x)=>a+x,0)`       | 集約（1値）                      | 単一の値          | 最後まで       | 全件処理           | 集計       |
| **some**      | `arr.some(x => x.active)`        | 条件を満たす要素が存在するか     | bool              | 一致で終了     | 途中終了           | 存在確認   |
| **every**     | `arr.every(x => x.active)`       | 全要素が条件を満たすか           | bool              | 不一致で終了   | 途中終了           | 全件確認   |
| **forEach**   | `arr.forEach(x=>...)`            | 副作用                           | undefined         | 最後まで       | 全件処理           | break不可  |
| **flat**      | `[1,[2,3]].flat()`               | ネストを平坦化                   | 新しい配列        | 最後まで       | ネスト深いと重い   | flatten    |
| **flatMap**   | `arr.flatMap(x => x.items)`      | map + flat                       | 新しい配列        | 最後まで       | 中間配列減る       | ネスト変換 |

---

# 便利テク & パターン集

## filter → map

絞り込み → 加工

```ts
const activeNames = users.filter((u) => u.active).map((u) => u.name);
```

## map → filter

加工 → 判定

```ts
const expensive = prices.map((p) => p * 1.1).filter((p) => p >= 1000);
```

## flatMap / map → flat

ネストレスポンス整形

```ts
const comments = posts.flatMap((p) => p.comments);
```

## filter → some/every

状態を絞った上で存在チェック

```ts
const hasAdmin = users.filter((u) => u.active).some((u) => u.role === "admin");
```

## reduce応用

集計・グルーピング

```ts
const group = items.reduce((acc, x) => {
  acc[x.category] ??= [];
  acc[x.category].push(x);
  return acc;
}, {});
```

## forEach注意点

1. break不可
1. returnで外に返らない
1. asyncと相性悪い→ async処理は for...of を使う

## 実務サンプル

フォーム項目の currentIndex 以降を初期化するケース

```ts
columnItem
  .filter((item) => currentIndex < item)
  .forEach((item) => {
    updated[item] = [];
    useForm?.setValue(`${name}${item}`, null);
  });
// 整理版
columnItem
  .filter((item) => item > currentIndex)
  .map((item) => ({
    index: item,
    key: `${name}${item}`,
  }))
  .forEach(({ index, key }) => {
    updated[index] = [];
    useForm?.setValue(key, null);
  });
```

# mapとflatMapの違い

## 結論

- **map**：要素をそのまま「変換」する
- **flatMap**：変換したあと **配列を1段階平坦化** する

> flatMap = map + flat

---

## map の基本

```ts
const nums = [1, 2, 3];

const result = nums.map((n) => n * 2);
// [2, 4, 6]
```

- 各要素を 1 対 1 で変換
- 戻り値をそのまま配列に並べる

---

## map で配列を返すとどうなるか

```ts
const nums = [1, 2, 3];

const result = nums.map((n) => [n, n * 2]);
// [[1, 2], [2, 4], [3, 6]]
```

- map は平坦化しない
- **配列の配列** ができる

---

## flatMap の基本

```ts
const nums = [1, 2, 3];

const result = nums.flatMap((n) => [n, n * 2]);
// [1, 2, 2, 4, 3, 6]
```

### 処理イメージ

1. map と同じように変換
2. 返ってきた配列を **1段階だけ flat**

---

## 図で理解する

### map

```
[1, 2, 3]
  ↓ map
[[1,2], [2,4], [3,6]]
```

### flatMap

```
[1, 2, 3]
  ↓ map
[[1,2], [2,4], [3,6]]
  ↓ flat
[1, 2, 2, 4, 3, 6]
```

---

## React でよくある例

### map の場合（ネストしてしまう）

```tsx
errors.map((error) => error.messages.map((msg) => <li key={msg}>{msg}</li>));
```

- 結果：`JSX.Element[][]`

---

### flatMap の場合（そのまま描画できる）

```tsx
errors.flatMap((error) =>
  error.messages.map((msg) => <li key={msg}>{msg}</li>)
);
```

- 結果：`JSX.Element[]`

---

## filter + map の代替パターン

### 通常

```ts
items.filter((item) => item.enabled).map((item) => item.value);
```

### flatMap

```ts
items.flatMap((item) => (item.enabled ? [item.value] : []));
```

- 条件に合わないものは `[]`
- flatMap により自然に除外される

---

## 使い分け指針

- 1対1の変換 → **map**
- 1対多の変換 → **flatMap**
- 配列の配列が欲しい → **map**
- 平坦な配列が欲しい → **flatMap**

---

## 注意点

- flatMap が平坦化するのは **1段階のみ**

```ts
[1, 2].flatMap((n) => [[n]]);
// [[1], [2]]
```

---

## 覚え方

> **flatMap = map して flat**

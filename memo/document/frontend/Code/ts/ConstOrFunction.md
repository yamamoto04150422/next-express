# Reactで `const` を使う理由（保存用まとめ）

## 結論

* **Reactでは関数を `const + アロー関数` に統一するのが安全**
* 主な理由は次の2つ

  * 再代入を防げる（意図が明確）
  * Hoisting を避けられる（事故防止）

---

## 1. 再代入を防げる（意図が明確）

### `function` の特徴

* 関数名は **後から上書き（再代入）できる**
* 同じ名前でも途中で処理内容が変わる可能性がある

```ts
function handleClick() {
  console.log("A");
}

handleClick(); // A

handleClick = () => {
  console.log("B");
};

handleClick(); // B
```

#### 問題点

* 処理が途中で変わってもエラーにならない
* ファイルが大きいと変更点に気づきにくい
* Reactでは意図しない挙動につながる

---

### `const` の特徴

* **再代入できない**
* 関数の定義が固定される

```ts
const handleClick = () => {
  console.log("A");
};

handleClick = () => {
  console.log("B");
};
// ❌ エラー（再代入不可）
```

#### Reactでの意味

* 「この関数はこの処理」と明確に示せる
* props や hooks に渡しても安心
* **関数も state 同様に「変わらない保証」が重要**

---

## 2. Hoisting を避けられる（事故防止）

### Hoisting とは

* JavaScriptの仕様で、宣言が実行前に先頭へ持ち上げられる挙動

---

### `function` は Hoisting される

```ts
handleSubmit(); // 定義前でも呼べてしまう

function handleSubmit() {
  console.log("submit");
}
```

#### 問題点

* 上から読んだ順序と実行順が一致しない
* 「まだ定義されていない関数」が使えてしまう
* Reactコンポーネント内で依存関係が見えにくくなる

---

### `const` は Hoisting されない

```ts
handleSubmit(); // ❌ エラー

const handleSubmit = () => {
  console.log("submit");
};
```

#### メリット

* **使う前に必ず定義が必要**
* 定義順のミスにすぐ気づける
* コードの見た目と実行の流れが一致する

---

## React視点で重要な理由

* Reactは以下を強く意識する設計

  * state
  * props
  * 関数
* 「何が変わって、何が変わらないか」が非常に重要
* `const` は「この関数は変わらない」という意図をコードで表現できる

---

## 最終まとめ

* 再代入させたくない → `const`
* 定義順の事故を防ぎたい → `const`
* React / Hooks と相性が良い → `const`

> **Reactでは関数は `const` で固定するのが基本思想**

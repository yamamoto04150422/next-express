# 依存ドロップダウンのURL組み立て

## 目的

- フォームの依存ドロップダウン（name / name2 / name3 …）から
- **安全に URL パスを組み立てる**

---

## `filter(Boolean)` を使う理由

### 何をしているか

```ts
paths.filter(Boolean);
```

- 配列内の **無効な値（falsy）を除外**する
- URL に `undefined` や空文字が混ざるのを防ぐ

### 除外される主な値

- `undefined`
- `null`
- `""`（空文字）
- `false`

### なぜ必要か

- フォーム値は **未選択状態になり得る**
- 依存ドロップダウンでは特に発生しやすい

```ts
["/api", undefined].join("");
// "/apiundefined" ← 事故
```

```ts
["/api", undefined].filter(Boolean).join("");
// "/api" ← 安全
```

---

## `buildSegment` の役割

### 責務

- フォーム値を **URL パス用の1セグメント**に変換する
- 値がなければ `undefined` を返す

---

## `buildSegment` 実装（JSDoc付き）

```ts
/**
 * フォームの組織系フィールド値を URL パス用セグメントとして生成する。
 *
 * - index = 1  -> `${name}`
 * - index >= 2 -> `${name}{index}`（例: name2, name3）
 *
 * @param index 組織階層のインデックス（1始まり）
 * @returns "/{value}" 形式のパス。値が未存在の場合は undefined
 */
const buildSegment = (index = 1): string | undefined => {
  const key = `${name}${index === 1 ? "" : index}`;
  const value = useForm?.getValues(key);

  if (!value) return undefined;

  return `/${value}`;
};
```

---

## URL組み立て側の基本形

```ts
if (soshikiNum === 1) return url;

const paths: Array<string | undefined> = [url];

paths.push(buildSegment(1));

if (soshikiNum >= 3) {
  paths.push(buildSegment(2));
}

return paths.filter(Boolean).join("");
```

---

## 設計ポイントまとめ

- `buildSegment`
  - 値がなければ **undefined を返す**

- URL 結合側
  - `filter(Boolean)` で **安全に除外**

- この2つは **セットで成立する設計**

---

## 期待される効果

- `/undefined` 混入防止
- 依存段数が増えても壊れない
- テストしやすい・責務が明確

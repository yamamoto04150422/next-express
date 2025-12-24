# Jest / TypeScript テスト運用まとめ（保存用）

## 目的

- Jest に関する理解を整理し、**あとから見返せる保存用メモ**として残す
- 「なぜそう書くのか」を説明できる状態にする

---

## jest.mock の役割

- モジュール全体を **モック関数（jest.fn）に置き換える**
- import 先で使われている関数も含めて差し替えられる

### 使う理由

- 副作用のある処理を止めるため
  - UI 操作（toast / alert / confirm）
  - ネットワーク通信（axios / fetch）
  - 環境依存処理（localStorage / navigator など）

```ts
jest.mock("./toast");
```

> テストでは「UI が表示されたか」ではなく
> 「その関数が呼ばれたか」を検証したい

---

## jest.fn との違い

- `jest.fn()`
  - **その場で作った関数だけ**をモック化

- `jest.mock()`
  - **モジュール全体**を自動でモック化

> import されている関数を差し替えたい場合は `jest.mock` が必須

---

## jest.clearAllMocks の役割

- モック関数の **呼び出し履歴をリセット**する

```ts
beforeEach(() => {
  jest.clearAllMocks();
});
```

### 使うタイミング

- 複数テストケースで **共通のモック関数**を使うとき
- `toHaveBeenCalled` / `toHaveBeenCalledWith` を使うとき

### 使わなくてもよいケース

- テストごとに `jest.fn()` を新しく作っている
- 呼び出し回数・引数を検証していない

> 共通モックを使うなら「安全のため毎回リセット」が基本

---

## matcher の違い

### toHaveBeenCalled

- 1回以上呼ばれたかどうかのみを確認

```ts
expect(fn).toHaveBeenCalled();
```

### toHaveBeenCalledWith

- **指定した引数で呼ばれたか**を確認

```ts
expect(fn).toHaveBeenCalledWith("A", 1);
```

> 数値の `1` や `2` は **実行回数ではなく、関数に渡された引数**

### 実行回数を確認したい場合

```ts
expect(fn).toHaveBeenCalledTimes(2);
```

---

## 純粋関数のテスト例（チェックボックス）

### 実装

```ts
export const toggleCheckboxValue = (
  current: string[] = [],
  item: string
): string[] => {
  return current.includes(item)
    ? current.filter((v) => v !== item)
    : [...current, item];
};
```

### テスト観点

- 空配列 → 追加される
- 既存値 → 削除される
- 新しい値 → 追加される
- current 未指定でも動く

```ts
expect(toggleCheckboxValue([], "A")).toEqual(["A"]);
expect(toggleCheckboxValue(["A", "B"], "A")).toEqual(["B"]);
```

> 副作用のない純粋関数はテストがシンプル

---

## 変数名の考え方

### 避けたい

- `value`（意味が広すぎる）

### 推奨

- `item`：配列の中で操作する対象
- `option`：選択肢
- `checkboxValue`：UI由来の値

> 「何を操作しているか」が名前から分かることを重視

---

## JSDOM と副作用の理解

- Jest は Node.js + JSDOM 環境
- 実ブラウザではないため UI 表示は正しく動かない

### そのため

- UI 表示処理は **モック化して呼び出しのみ検証**する

---

## まとめ（説明用）

- jest.mock：本物の処理を止めてモックに差し替える
- jest.clearAllMocks：テストを独立させるため履歴を消す
- matcher は「呼ばれたか」「何で呼ばれたか」を選ぶ
- 純粋関数はロジック単位でテストする

> テストは「何を保証したいか」を最小単位で書く

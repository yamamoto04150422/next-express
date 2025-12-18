# 保存用まとめ（Jest / テスト設計 / 純粋関数）

## このドキュメントの目的

- 過去に質問・理解した内容を **後から読み返せる形で整理** する
- Jest の考え方・モック・テスト設計を **実務視点で定着させる**
- 「なぜそうするのか」を忘れないためのメモ

---

## Jest の基本スタンス

- Jest は **Node.js 上で動くテストランナー**
- ブラウザそのものではなく **JSDOM（簡易 DOM）** を使っている
- そのため以下はそのままでは正しく動かないことが多い
  - toast / alert / confirm
  - UI アニメーション
  - 実ブラウザ依存の処理

**テストでは「結果」ではなく「呼ばれたか」を見る**

---

## モックとは何か

### モックの本質

- 本物の処理を止めて
- **偽物の関数（jest.fn）に差し替える** こと

### なぜモックするのか

- UI 副作用を実行したくない
- ネットワークや環境依存を切り離したい
- テスト対象のロジックだけに集中したい

---

## jest.mock と jest.fn の役割

### jest.mock("./toast")

- モジュール **丸ごと** モック化する
- import されている関数もすべて jest.fn に置き換わる
- テスト対象ファイル内部の依存関係まで差し替えられる

```ts
jest.mock("./toast");
```

副作用を持つモジュールでは **ほぼ必須**

---

### jest.fn()

- 個別の関数をモック化
- 呼び出し回数・引数を記録できる

```ts
const fn = jest.fn();
fn("A", 1);
```

テスト内で完結する関数ならこれで十分

---

## モックの履歴管理

### jest.clearAllMocks()

- モック関数の **呼び出し履歴だけ** をリセット
- モック自体は残る

```ts
beforeEach(() => {
  jest.clearAllMocks();
});
```

### いつ使うか

- 複数テストケースで **共通モックを使い回すとき**
- 呼び出し回数・引数を検証するとき

### いつ不要か

- テストごとに jest.fn を新しく作っている
- 呼び出し履歴を検証していない

「共通モックがあるなら基本入れる」でOK

---

## matcher の意味整理

### toHaveBeenCalled

- 1回以上呼ばれたかだけを見る

```ts
expect(fn).toHaveBeenCalled();
```

---

### toHaveBeenCalledWith

- **特定の引数で呼ばれたことがあるか** を見る
- 回数や順番は問わない

```ts
expect(fn).toHaveBeenCalledWith("A", 1);
```

※ 1 や 2 は **実行回数ではなく引数の値**

---

### toHaveBeenCalledTimes

- 呼び出された **回数そのもの** を見る

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

---

### テスト観点

- 空配列から追加される
- 既存値は削除される
- 新しい値は追加される
- current 未指定でも動く

```ts
expect(toggleCheckboxValue([], "A")).toEqual(["A"]);
expect(toggleCheckboxValue(["A", "B"], "A")).toEqual(["B"]);
```

副作用がないため **モック不要・テストが最小**

---

## 変数名の考え方

### value が微妙な理由

- input.value と混同しやすい
- 何を操作しているか分かりづらい

### 推奨

- item
- option
- checkboxValue

**「配列の中の何を操作しているか」が伝わる名前**

---

## 副作用の代表例（モック対象）

- UI：toast / alert / confirm
- 通信：axios / fetch
- 時間：setTimeout / Date
- 環境：localStorage / process.env

「テスト結果に直接関係しないもの」はモック候補

---

## 最終まとめ

- jest.mock：依存関係を切る
- jest.fn：呼び出しを観測する
- clearAllMocks：テストを独立させる
- 純粋関数は最小テストでOK
- テストは **仕様の保存場所**

---

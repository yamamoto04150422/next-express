# extractMessages 保存用まとめ

## 概要

- テーブル形式（行 × カラム）のバリデーションエラーから
- **画面表示用のエラーメッセージ配列**を生成するユーティリティ関数
- UI（React コンポーネント）からロジックを分離する目的で切り出した

---

## 背景・リファクタリング前の課題

- JSX 内で以下をすべて実施していた
  - 行ループ
  - カラムループ
  - 除外フィールド判定
  - message の有無チェック
  - 描画

- 可読性が低く、テストが困難
- UI とデータ整形ロジックが密結合

---

## リファクタリング方針

- **表示ロジックとデータ変換ロジックを分離**
- 純粋関数として切り出し、単体テスト可能にする
- 型を実データ構造に合わせる

---

## ファイル構成

```
/utils/validation/
  ├─ types.ts
  ├─ extractMessages.ts
  └─ extractMessages.test.ts
```

---

## 型定義（types.ts）

```ts
export interface ErrorWithArgs {
  message: string;
  args?: (string | number)[];
}

// テーブル1行分のエラー（存在しないカラムは undefined）
export type TableRowErrors = Record<string, ErrorWithArgs | undefined>;

// テーブル全体のエラー
export type TableErrors = TableRowErrors[];
```

### ポイント

- `Record<string, ErrorWithArgs>` ではなく `ErrorWithArgs | undefined`
- 行ごとにカラムが異なる実データ構造を正しく表現
- テストデータを自然に書ける

---

## extractMessages の責務

- 行 × カラム構造のエラーを **フラットなメッセージ配列**に変換
- 指定されたカラム（excludeFields）を除外
- message を持たないエラーは無視
- 並び順は **元データの順序を維持**

---

## 実装（extractMessages.ts）

```ts
import { TableErrors } from "./types";

/**
 * テーブル形式のバリデーションエラーから
 * 画面表示用のエラーメッセージ一覧を抽出する。
 */
export const extractMessages = (
  errors: TableErrors,
  excludeFields: string[]
): string[] => {
  return errors.flatMap((rowError) =>
    Object.entries(rowError)
      .filter(
        ([field, error]) => !excludeFields.includes(field) && !!error?.message
      )
      .map(([, error]) => error!.message)
  );
};
```

---

## メッセージ順序の仕様

- **並び替え処理は行っていない**
- 順序は以下で決定される
  1. `errors` 配列の順（行順）
  2. `Object.entries(rowError)` のキー定義順

### 補足

- JavaScript の仕様により、文字列キーは定義順で列挙される
- rowError がテーブルの列定義順で生成されているため、
  画面上は「カラム順」に見える

---

## テスト（extractMessages.test.ts）

```ts
import { extractMessages } from "./extractMessages";
import { TableErrors } from "./types";

describe("extractMessages", () => {
  test("テーブル形式のエラーをフラットな配列に変換できる", () => {
    const errors: TableErrors = [
      {
        data1: { message: "データ１は半角数字を入力してください" },
        data4: { message: "データ４は必須入力項目です" },
        data5: { message: "データ５は必須入力項目です" },
      },
      {
        data1: { message: "データ１は半角数字を入力してください" },
      },
    ];

    expect(extractMessages(errors, [])).toEqual([
      "データ１は半角数字を入力してください",
      "データ４は必須入力項目です",
      "データ５は必須入力項目です",
      "データ１は半角数字を入力してください",
    ]);
  });

  test("excludeFields に指定したカラムは除外される", () => {
    const errors: TableErrors = [
      {
        id: { message: "IDエラー" },
        data1: { message: "データ１は必須です" },
      },
    ];

    expect(extractMessages(errors, ["id"])).toEqual(["データ１は必須です"]);
  });

  test("message を持たないエラーは無視される", () => {
    const errors: TableErrors = [
      {
        data1: { message: "データ１は必須です" },
        data2: undefined,
      },
    ];

    expect(extractMessages(errors, [])).toEqual(["データ１は必須です"]);
  });

  test("エラーが空の場合は空配列を返す", () => {
    expect(extractMessages([], [])).toEqual([]);
  });
});
```

---

## 学び・設計メモ

- JSX にロジックを書かない
- データ変換は純粋関数に切り出す
- テストが書きづらい型は設計を疑う
- **JSDoc + テスト = 仕様書**

---

## 利用シーン

- テーブル入力画面のバリデーションエラー一覧表示
- React Hook Form の FieldErrors を整形して表示するケース
- UI ライブラリ非依存で再利用したい場合

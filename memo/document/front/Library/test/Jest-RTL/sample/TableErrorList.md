# TableErrorList テスト理解まとめ

```ts
import { render, screen } from "@testing-library/react";
import TableErrorList from "./TableErrorList";
import { extractMessages } from "@/app/utils/extractMessages";

jest.mock("@/app/utils/extractMessages", () => ({
  extractMessages: jest.fn(),
}));

const mockedExtractMessages = extractMessages as jest.Mock;

describe("TableErrorList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("errors が undefined の場合は何も表示しない", () => {
    const { container } = render(<TableErrorList errors={undefined} />);

    expect(container.firstChild).toBeNull();
    expect(mockedExtractMessages).not.toHaveBeenCalled();
  });

  test("errors が空配列の場合は何も表示しない", () => {
    const { container } = render(<TableErrorList errors={[]} />);

    expect(container.firstChild).toBeNull();
    expect(mockedExtractMessages).not.toHaveBeenCalled();
  });

  test("extractMessages の結果が空の場合は何も表示しない", () => {
    mockedExtractMessages.mockReturnValue([]);

    const { container } = render(
      <TableErrorList errors={[{ field: "name", message: "error" } as any]} />
    );

    expect(container.firstChild).toBeNull();
    expect(mockedExtractMessages).toHaveBeenCalled();
  });

  test("エラーメッセージが表示される", () => {
    mockedExtractMessages.mockReturnValue([
      "名前は必須です",
      "年齢は数値で入力してください",
    ]);

    render(
      <TableErrorList errors={[{ field: "dummy", message: "dummy" } as any]} />
    );

    expect(screen.getByText("名前は必須です")).toBeInTheDocument();
    expect(screen.getByText("年齢は数値で入力してください")).toBeInTheDocument();
  });

  test("excludeFields が extractMessages に渡される", () => {
    mockedExtractMessages.mockReturnValue(["エラー"]);

    const errors = [{ field: "password", message: "error" }] as any;
    const excludeFields = ["password"];

    render(
      <TableErrorList errors={errors} excludeFields={excludeFields} />
    );

    expect(mockedExtractMessages).toHaveBeenCalledWith(errors, excludeFields);
  });
});
```

## 目的

- TableErrorList コンポーネントのテストで使っている
  - Jest
  - React Testing Library（RTL）

- ** 「何をしているか」「なぜ必要か」 **を整理する

---

## ① jest.mock は何をしているか

```ts
jest.mock("@/app/utils/extractMessages", () => ({
  extractMessages: jest.fn(),
}));
```

### 何をしているか

- `extractMessages` を **本物の実装からモック関数に差し替えている**

### なぜ必要か

- TableErrorList の責務は **表示ロジック**
- メッセージ生成ロジックは別責務
- 依存関数をモックすることで
  - 呼ばれたか
  - 引数は何か
  - 戻り値は何か
    を自由に制御できる

---

## ② jest.clearAllMocks を afterEach で使う理由

```ts
afterEach(() => {
  jest.clearAllMocks();
});
```

### 何をしているか

- モックの
  - 呼び出し履歴
  - 戻り値設定

- をリセットする

### なぜ必要か

- 前のテストの状態が次のテストに影響するのを防ぐ
- **各テストを独立させるため**

---

## ③ container とは何か

```ts
const { container } = render(<TableErrorList errors={undefined} />);
```

### container の正体

- `render` された DOM 全体の **ルート要素**

```html
<div>
  ← container
  <!-- コンポーネントの描画結果 -->
</div>
```

---

## ④ なぜ container.firstChild を確認するのか

```ts
expect(container.firstChild).toBeNull();
```

### 理由

- `container` 自体は常に存在する
- `return null` の場合
  - DOM ノードが 1つも作られない

### 意味

- **「本当に何も描画されていない」ことの確認**

---

## ⑤ mockReturnValue([]) は何をしているか

```ts
mockedExtractMessages.mockReturnValue([]);
```

### 何をしているか

- `extractMessages` が **空配列を返すケース**を再現している

### テスト対象の分岐

```ts
if (messages.length === 0) return null;
```

- エラーは存在する
- ただし表示対象メッセージは 0件
- → 画面には何も表示されないことを確認

---

## 全体まとめ

| 項目                | 意味                           |
| ------------------- | ------------------------------ |
| jest.mock           | 依存ロジックを切り離す         |
| clearAllMocks       | テストを独立させる             |
| container           | 描画結果のDOMルート            |
| firstChild          | 何も描画されていないことの確認 |
| mockReturnValue([]) | 空データ分岐の再現             |

---

## 方針メモ

- コンポーネントテストでは **表示結果のみを見る**
- ロジックはモック or 別ユニットテストに分離
- `return null` コンポーネントは `container.firstChild === null` で確認する

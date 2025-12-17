# Jest/React Testing Library の基本的なテストの書き方

## 目次

- [1. テストの全体構造](#1-テストの全体構造)
  - [テンプレート](#テンプレート)
- [2. 各部分の説明](#2-各部分の説明)
  - [① 何のテストか](#-何のテストか)
  - [② テストケース](#-テストケース)
  - [③ 実行結果の確認](#-実行結果の確認)
- [3. アサーション関数について](#3-アサーション関数について)
  - [基本構文](#基本構文)
  - [アサーションのフロー](#アサーションのフロー)
  - [よく使うマッチャーの一覧](#よく使うマッチャーの一覧)
    - [1. 一般的な値の確認](#1-一般的な値の確認)
    - [2. DOM 要素の確認](#2-dom-要素の確認)
  - [使用例](#使用例)
- [4. よく使うメソッド一覧](#4-よく使うメソッド一覧)
  - [screen のメソッド](#screen-のメソッド)
- [5. テストの実行方法](#5-テストの実行方法)

## 1. テストの全体構造

Jest のテストは次のような構造で記述します：

### テンプレート

```tsx
describe("テスト対象の名前", () => {
  test("テストケースの説明", () => {
    // テスト対象を準備
    // テスト実行
    // 実行結果の検証
  });
});
```

## 2. 各部分の説明

### ① **何のテストか**

`describe` ブロックを使い、テストするコンポーネントや機能の名前を付けます。  
これは、テストのグループ化に役立ちます。

例：

```tsx
describe("CustomFieldset", () => {
  // CustomFieldset コンポーネントに関するテスト
});
```

### ② **テストケース**

`test` またはエイリアスである `it` を使って、個々のテストケースを書きます。  
テストの内容を説明する簡潔な文章を引数として渡します。

例：

```tsx
test("renders title and children correctly", () => {
  // タイトルと子要素が正しく表示されるか確認するテスト
});
```

### ③ **実行結果の確認**

テストの結果が期待通りであることを **アサーション関数（`expect`）** を使って検証します。

例：

```tsx
expect(screen.getByText("Fieldset Title")).toBeInTheDocument();
```

## 3. アサーション関数について

`expect` はテストの結果を検証するための関数です。

### 基本構文

```tsx
expect(actualValue).toBe(expectedValue);
```

- **`actualValue`**：テスト対象の値や要素（例: 関数の戻り値、DOM 要素）。
- **`toBe(expectedValue)`**：実際の値が期待する値と一致することを確認するマッチャー。

### アサーションのフロー

1. **`expect`**
   - テスト対象（**実際の値**）を受け取ります。

2. **マッチャー**
   - `toBe` などのメソッドで **期待する条件** を記述します。

### よく使うマッチャーの一覧

#### 1. **一般的な値の確認**

- **`toBe`**
  - 厳密な等価性（`===`）を確認します。

  ```tsx
  expect(1 + 1).toBe(2);
  ```

- **`toEqual`**
  - オブジェクトや配列の構造が一致することを確認します。

  ```tsx
  expect({ a: 1 }).toEqual({ a: 1 });
  ```

- **`not`**
  - 条件が **成り立たないこと** を確認します。

  ```tsx
  expect(1 + 1).not.toBe(3);
  ```

#### 2. **DOM 要素の確認**

- **`toBeInTheDocument`**
  - 要素が DOM に存在することを確認します。

  ```tsx
  expect(screen.getByText("Fieldset Title")).toBeInTheDocument();
  ```

- **`toHaveTextContent`**
  - 要素のテキスト内容が一致することを確認します。

  ```tsx
  expect(element).toHaveTextContent("Expected Text");
  ```

- **`toHaveAttribute`**
  - 要素が特定の属性を持つことを確認します。

  ```tsx
  expect(element).toHaveAttribute("type", "button");
  ```

- **`toHaveClass`**
  - 要素が特定のクラスを持つことを確認します。

  ```tsx
  expect(element).toHaveClass("active");
  ```

- **`toHaveStyle`**
  - 要素が特定のインラインスタイルを持つことを確認します。

  ```tsx
  expect(element).toHaveStyle("display: block");
  ```

- **`toBeDisabled` / `toBeEnabled`**
  - 要素が無効化または有効であることを確認します。

  ```tsx
  expect(button).toBeDisabled();
  ```

- **`toBeChecked`**
  - チェックボックスやラジオボタンが選択されていることを確認します。

  ```tsx
  expect(checkbox).toBeChecked();
  ```

- **`toContainElement`**
  - 要素が別の要素を含んでいることを確認します。

  ```tsx
  expect(parent).toContainElement(child);
  ```

### 使用例

以下は、React Testing Library を使った具体的なアサーション例です。

```tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const ExampleComponent = () => (
  <div>
    <h1>Example Title</h1>
    <input placeholder="Enter text" />
    <button type="submit" disabled>
      Submit
    </button>
  </div>
);

describe("ExampleComponent", () => {
  test("renders title, input, and disabled button", () => {
    render(<ExampleComponent />);

    // タイトルの確認
    expect(
      screen.getByRole("heading", { name: /example title/i })
    ).toBeInTheDocument();

    // プレースホルダーで要素を取得
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();

    // ボタンが無効化されていることを確認
    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toBeDisabled();
  });
});
```

## 4. よく使うメソッド一覧

### **`screen` のメソッド**

`screen` は DOM にアクセスするためのメソッドを提供します。
詳しくは [こちら](#よく使うメソッド一覧) を参照してください。

## 5. テストの実行方法

ターミナルで次のコマンドを実行します：

```bash
npm test
```

特定のファイルだけをテストする場合は：

```bash
npm test ExampleComponent.test.tsx
```

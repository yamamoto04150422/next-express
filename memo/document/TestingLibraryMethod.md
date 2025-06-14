# Testing Library - 要素の取得優先順位（Jest向け）

Testing Libraryでは、「ユーザーが実際に見る・操作する情報を元にテストを書く」ことが基本ルールです。  
そのため、**取得メソッドにも優先順位があります**。

## ✅ 優先順位（高い → 低い）

| 優先度        | メソッド                      | 説明                                       | 例                                       |
| ------------- | ----------------------------- | ------------------------------------------ | ---------------------------------------- |
| 🥇 最優先     | `getByRole`                   | 見た目の役割（ボタン、リンク、見出しなど） | `getByRole('button', { name: '送信' })`  |
| 🥈 高い       | `getByLabelText`              | ラベル付きのフォーム要素                   | `getByLabelText('名前')`                 |
| 🥉 中程度     | `getByPlaceholderText`        | プレースホルダー付き入力欄                 | `getByPlaceholderText('メールアドレス')` |
| 🔤 中程度     | `getByText`                   | テキストノード（見出し、段落など）         | `getByText('ようこそ')`                  |
| ✍️ 中程度     | `getByDisplayValue`           | 入力済みの値で取得                         | `getByDisplayValue('太郎')`              |
| 🖼 補助的     | `getByAltText` / `getByTitle` | 画像やツールチップの説明                   | `getByAltText('ロゴ')`                   |
| 🛠 最後の手段 | `getByTestId`                 | 開発用ID（視覚情報ではない）               | `getByTestId('submit-button')`           |

## 💬 他人に教えるときの説明例

> 「Testing Libraryで要素を取得するときは、**ユーザーが実際に見たり触れたりする情報から優先的に使う**のが基本だよ。  
> たとえば、ボタンは`getByRole`、フォームは`getByLabelText`で取るのが一番自然。  
> `getByTestId`は“どうしても他で取れないときだけ”使うようにしよう。」

---

## 🔧 補足ポイント

- `getByRole`は`name`オプションでボタンや見出しのテキストを指定できる。

  ```ts
  getByRole("heading", { name: "ダッシュボード" });
  ```

# getByRoleの使い方まとめ

`getByRole` は **最も推奨される要素取得方法** です。  
アクセシビリティの「役割（role）」を使って、ユーザー視点に近い形で取得します。

## よく使う role 一覧（button 以外も含む）

| Role名     | 対応要素・用途           | 取得例                                              |
| ---------- | ------------------------ | --------------------------------------------------- |
| `heading`  | 見出し（`<h1>` など）    | `getByRole('heading', { name: 'ログイン' })`        |
| `link`     | リンク（`<a>`）          | `getByRole('link', { name: '詳しくはこちら' })`     |
| `textbox`  | テキスト入力欄           | `getByRole('textbox', { name: 'コメント' })`        |
| `checkbox` | チェックボックス         | `getByRole('checkbox', { name: '利用規約に同意' })` |
| `radio`    | ラジオボタン             | `getByRole('radio', { name: '男性' })`              |
| `combobox` | セレクトボックス         | `getByRole('combobox', { name: '都道府県' })`       |
| `button`   | ボタン（`<button>`など） | `getByRole('button', { name: '送信' })`             |
| `alert`    | エラーメッセージ表示     | `getByRole('alert')`                                |
| `dialog`   | モーダルウィンドウ       | `getByRole('dialog', { name: '確認' })`             |
| `listitem` | リスト内の要素           | `getByRole('listitem', { name: 'りんご' })`         |
|            |

## optionsで使えるプロパティ一覧

| オプション    | 説明                                             |
| ------------- | ------------------------------------------------ |
| `name`        | アクセシブルネーム（ラベルやテキスト）           |
| `hidden`      | 非表示要素を含めて取得する（例: `hidden: true`） |
| `selected`    | 選択状態（`option`要素など）                     |
| `checked`     | チェック状態のフィルタリング                     |
| `expanded`    | 展開状態（アコーディオンなど）                   |
| `pressed`     | ボタンの押下状態（トグルボタン）                 |
| `level`       | 見出しのレベル（`heading`の時のみ、1〜6）        |
| `description` | `aria-describedby`の内容でフィルタ（※試験的）    |

# `fireEvent` より `userEvent` を使う理由（Jest + Testing Library）

## 🔥 `fireEvent` の特徴

- DOM イベントを「直接」発火する低レベルAPI
- 例: `fireEvent.click(button)`
- `onClick` などのハンドラが即座に呼ばれるだけ

### ⚠️ 主な欠点

- 実際のユーザー操作を正確に再現しない（フォーカス移動・時間経過などなし）
- アクセシビリティ（a11y）を考慮した動作ではない
- フォーム入力の流れなどを正しくテストできない場合がある

---

## 👤 `userEvent` の特徴

- 実際のユーザー操作に近い高レベルAPI
- 例: `userEvent.type(input, 'hello')` は1文字ずつ入力される
- マウスやキーボードの操作を段階的に再現
- `tab`, `click`, `selectOptions` など多くのユーザー動作をサポート

### ✅ 主な利点

- ユーザー視点の自然な挙動を再現できる
- フォーカス移動や入力のタイミングなども含めてテストできる
- 将来的なブラウザ仕様の変化にも強い
- アクセシビリティの確認にも役立つ

---

## 📌 まとめ：使い分けの指針

| シチュエーション                       | 推奨API        |
| -------------------------------------- | -------------- |
| 実際のユーザー操作を再現したいとき     | `userEvent` ✅ |
| カスタムイベントの発火など特別なケース | `fireEvent` ⚠️ |

## 🧪 例：`fireEvent` vs `userEvent`

```ts
// fireEvent: 即時に値が変わる
fireEvent.change(input, { target: { value: "hello" } });

// userEvent: 実際のタイプに近い（1文字ずつ入力）
await userEvent.type(input, "hello");
```

## 結論

userEventを使うのは：

「機械的なイベント発火」ではなく、「人間の操作」をシミュレートするため」

基本的には userEvent を使い、どうしても必要なケースのみ fireEvent を使う。

```

```

# Testing Library 要素取得とユーザー操作の基本

## 🎯 基本原則

「ユーザー視点でテストを書く」ことが最重要。
画面上でユーザーが見る・触れる情報を基準に、意味のある方法で要素を取得しましょう。

## 🔝 要素取得の優先順位（高 → 低）

| 優先度      | メソッド                      | 説明                                 | 例                                       |
| ----------- | ----------------------------- | ------------------------------------ | ---------------------------------------- |
| 🥇 最優先   | `getByRole`                   | アクセシビリティの**役割**で取得     | `getByRole('button', { name: '送信' })`  |
| 🥈 高い     | `getByLabelText`              | ラベルと関連付いたフォーム要素       | `getByLabelText('名前')`                 |
| 🥉 中程度   | `getByPlaceholderText`        | プレースホルダー属性のある入力欄     | `getByPlaceholderText('メールアドレス')` |
| 🔤 中程度   | `getByText`                   | 表示テキストそのもので取得           | `getByText('ようこそ')`                  |
| ✍️ 中程度   | `getByDisplayValue`           | 入力済みの値で取得                   | `getByDisplayValue('太郎')`              |
| 🖼 補助的   | `getByAltText` / `getByTitle` | 画像のalt属性やtitle属性             | `getByAltText('ロゴ')`                   |
| 🛠 最終手段 | `getByTestId`                 | テスト専用のID属性。UIからは見えない | `getByTestId('submit-button')`           |

```
💡 getByTestIdは最後の手段！
「ユーザーが見える情報」で取れないときだけに使いましょう。
```

## getBy, queryBy, findBy の違いと使い分け

| メソッド  | 概要                     | 要素が**見つからない場合** | 特徴                                               | 使用用途例                                                                                               | 取得例                                                                                    |
| --------- | ------------------------ | -------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `getBy`   | 即座に取得               | エラーを投げる             | 同期。要素が**確実に存在する**前提で使用           | バリデーション直後に表示されるエラーメッセージの検証など                                                 | `getByRole('alert')`<br>`getByText('エラーが発生しました')`                               |
| `queryBy` | 存在有無の確認（0 or 1） | `null` を返す              | 同期。**要素が存在しないことを確認**したい時に便利 | 特定のボタンやリンクが表示されないことを確認したいとき（例：未ログインユーザーに表示されないリンクなど） | `queryByRole('button', { name: '削除' })`<br>`queryByTestId('admin-only')`                |
| `findBy`  | 非同期で取得             | タイムアウト後にエラー     | **非同期レンダリングに対応**。`await` が必要       | API呼び出し後に表示される一覧や、ローディング後に表示されるコンテンツの取得                              | `await findByText('読み込み完了')`<br>`await findByRole('heading', { name: '記事一覧' })` |

```
それぞれ getAllBy / queryAllBy / findAllBy を使えば「複数要素」の取得も可能です
```

## 各メソッド共通で使えるオプション

ほとんどのメソッド（特に *ByRole, *ByText など）では以下のようなオプションが使えます：

| オプション   | 対応するメソッド          | 説明                                                     |
| ------------ | ------------------------- | -------------------------------------------------------- |
| `name`       | `*ByRole`, `*ByLabelText` | アクセシブルネーム（ラベルやボタンのテキスト）で絞り込む |
| `hidden`     | 多くのメソッドで対応      | 非表示要素も対象に含める（例: `hidden: true`）           |
| `selector`   | `*ByRole`, `*ByLabelText` | 特定のセレクターをさらに指定（例: `selector: 'input'`）  |
| `exact`      | `*ByText`, `*ByRole`, 他  | テキスト一致を厳密にする（デフォルト: `true`）           |
| `normalizer` | ほぼ全メソッド            | 空白除去など、文字列正規化関数をカスタマイズ             |

## 使用例まとめ

```
// ✅ getBy: 即時取得・存在が前提
screen.getByRole('heading', { name: 'ダッシュボード' });

// ✅ queryBy: 存在しないことを確認
expect(screen.queryByText('管理者設定')).not.toBeInTheDocument();

// ✅ findBy: 非同期要素の取得（APIなど）
await screen.findByRole('listitem', { name: 'りんご' });
```

## 一言まとめ

「getBy は“いる前提”、queryBy は“いない前提”、findBy は“あとで現れる前提”で使う」

## 💬 他人に教えるときの説明例

```
「Testing Libraryでは、“ユーザーがどう見るか”を基準にテストを書くんだよ。
たとえばボタンならgetByRoleで、フォームならgetByLabelTextで取るのが自然。
getByTestIdは“最後の手段”。テストのためだけの仕掛けになるからね。」
```

## getByRole の使い方まとめ

最重要メソッドです。アクセシビリティに基づいた「役割（role）」で要素を取得できます。

## ✅ よく使う role と取得例

| Role名     | 用途・対応要素            | 使用例                                              |
| ---------- | ------------------------- | --------------------------------------------------- |
| `button`   | `<button>`                | `getByRole('button', { name: '送信' })`             |
| `textbox`  | `<input type="text">`     | `getByRole('textbox', { name: 'コメント' })`        |
| `checkbox` | `<input type="checkbox">` | `getByRole('checkbox', { name: '利用規約に同意' })` |
| `heading`  | `<h1>〜<h6>`              | `getByRole('heading', { name: 'ログイン' })`        |
| `dialog`   | モーダル                  | `getByRole('dialog', { name: '確認' })`             |
| `alert`    | エラーメッセージ表示      | `getByRole('alert')`                                |
| `link`     | `<a>`                     | `getByRole('link', { name: '詳しくはこちら' })`     |

## getByRole のオプション

| オプション    | 説明                                                      |
| ------------- | --------------------------------------------------------- |
| `name`        | アクセシブルな名前（テキストなど）                        |
| `level`       | 見出しのレベル指定（例：`level: 2`）                      |
| `hidden`      | 非表示要素も含める                                        |
| `checked`     | チェック状態のフィルタリング                              |
| `selected`    | セレクトボックス内で選択されている要素                    |
| `expanded`    | アコーディオンなどの展開状態                              |
| `pressed`     | トグルボタンの押下状態                                    |
| `description` | `aria-describedby` で説明がついている要素の取得（試験的） |

## 🔄 fireEvent vs userEvent の違い

### 🔥 fireEvent（低レベルAPI）

- DOMイベントを直接発火
- 例: fireEvent.click(button)
- onClickは呼ばれるが、フォーカス移動やキーボード操作などは省略

### ⚠️ デメリット

- 実際のユーザー操作と一致しない
- 入力フォームやバリデーションで不具合が出やすい

### 👤 userEvent（高レベルAPI）

- 実際のユーザー操作をシミュレート
- 例: await userEvent.type(input, 'hello')
- 1文字ずつ入力、タブ移動、マウス操作、選択などすべて再現

### ✅ メリット

- ユーザー視点の自然な動作を再現
- アクセシビリティ対応や将来の仕様変更にも強い
- 入力フォーム・バリデーションテストに最適

使用例比較

```
// fireEvent: 機械的に変更
fireEvent.change(input, { target: { value: "hello" } });

// userEvent: 実際の入力を再現（推奨）
await userEvent.type(input, "hello");
```

## 結論

| テストしたいこと                     | 推奨API        |
| ------------------------------------ | -------------- |
| 実際のユーザー操作を再現したい       | `userEvent` ✅ |
| 特殊なイベント（スクロールなど）など | `fireEvent` ⚠️ |

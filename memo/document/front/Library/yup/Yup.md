# Yup バリデーションメッセージ指定方法まとめ

## 1. Yup とは

JavaScript/TypeScript 向けのスキーマバリデーションライブラリ。

- [公式リポジトリ (GitHub)](https://github.com/jquense/yup)
- React Hook Form などとよく組み合わせて利用される。

---

## 2. メッセージの指定方法

Yup のバリデーションルールごとに、エラーメッセージの渡し方が異なる。

### 2-1. `required`, `max`, `min` など

第2引数に `message` を渡す仕様。

`message` には **文字列** または **関数** が使える。

```javascript
// 固定文字列
Yup.string().required("必須入力です");
Yup.string().max(10, "10文字以下で入力してください");

// 関数で ValidationErrorParams を利用
Yup.string().max(10, ({ path }) => `${path}は10文字以下で入力してください`);
```

### 2-2. matches の場合

第2引数がオブジェクトになっており、そこに message を渡す。

`excludeEmptyString`などの追加オプションも指定可能。

## 3. ValidationErrorParams とは？

Yup がエラーを生成するときに渡してくれる情報オブジェクト。

`path, value, originalValue, label, type`などが含まれる。

関数形式の message で分割代入して利用可能。

```
Yup.string().required(({ path, value }) => {
  return `${path}は必須です。現在の値: ${value}`;
});
```

`path` の例

- single → "single"
- table[0].name → "table[0].name"

これを正規表現で処理すれば、「テーブル1行目:name」などと表示できる。

## 4. 参照方法

この仕様は以下で確認可能。

型定義ファイル
`node_modules/yup/index.d.ts`

VSCode での確認方法

メソッドに `Ctrl + Click` でジャンプ可能。

例:

```

required(message?: TestOptionsMessage): this;
max(limit: number, message?: TestOptionsMessage): this;
matches(regex: RegExp, options?: MatchOptions): this;

```

## 5. まとめ

- Yup の各メソッドでエラーメッセージの渡し方が異なる。
  - required, max など → 第2引数が message
  - matches → オプションオブジェクト { message, excludeEmptyString }
- ValidationErrorParams を関数形式で受け取れば、path などを使って動的にメッセージを作れる。
- 詳細は型定義ファイル or 公式ドキュメントを参照すべき

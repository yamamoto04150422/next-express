# Yup × React Hook Form 型不一致エラー対策まとめ

## 発生したエラー

型 `'Resolver<{ single: string; table: { name?: string | undefined; test: string; }[]; }>'` を  
型 `'Resolver<FormValues, any, FormValues>'` に割り当てることはできません。

---

## Yup が推論した型

```typescript
{
  single: string;
  table: { name?: string | undefined; test: string; }[];
}
```

## FormValues の型

```
type TableRow = { name: string; test: string };
type FormValues = { single: string; table: TableRow[] };
```

`name` が `string | undefined` になっているため不一致。

## 原因

- `Yup.string().required()` だけだと、型が `string | undefined` のまま残る場合がある。
- `.concat(...)` を使うとさらに `undefined` が落ちず、必須なのにオプショナル扱いされてしまう。

## 解決策

`.defined()` を追加して `undefined` を型から除去する。

```
const tableFieldSchema = Yup.array().of(
  Yup.object().shape({
    name: stringRules.stringRequired
      .concat(stringRules.regexNumber("半数値"))
      .defined(), // ← ここで型を string に確定
    test: Yup.string()
      .required(({ path }) => {
        const match = path.match(/\[(\d+)\]\.(.+)/);
        if (match) {
          const rowIndex = Number(match[1]) + 1;
          const fieldName = match[2];
          return `テーブル ${rowIndex}行目:${fieldName}は必須入力です。`;
        }
        return "必須入力です。";
      })
      .defined(),
  })
);
```

## 運用ルール

必須項目は必ず .`defined()` を付ける

```
Yup.string().required().defined();
Yup.number().required().defined();
```

## まとめ

- .defined() を付けて string 型に確定させる。
- チーム規約として「必須項目は .defined() を付ける」を徹底するのが安全。

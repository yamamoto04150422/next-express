## 型パラメータ

| 名前 | 意味          | 使われ方           |
| ---- | ------------- | ------------------ |
| T    | Type          | 汎用的な型         |
| K    | Key           | オブジェクトのキー |
| V    | Value         | 値                 |
| U    | Unionの相手型 | Excludeなど        |
| R    | Return        | 戻り値             |
| P    | Property      | プロパティ         |

---

## オブジェクト系（プロパティ操作）

- Partial<T>
- Required<T>
- Readonly<T>
- Record<K, T>
- Pick<T, K>
- Omit<T, K>

| 型       | 概要                               | 主な使用用途                         |
| -------- | ---------------------------------- | ------------------------------------ |
| Partial  | すべてのプロパティを任意にする     | 更新APIのDTO、フォームの部分更新     |
| Required | すべてのプロパティを必須にする     | Optional型を強制的に必須化したい場合 |
| Readonly | すべてのプロパティをreadonlyにする | 不変オブジェクト、状態管理           |
| Record   | Keyを指定してオブジェクト型を生成  | enumやUnionをキーにしたマップ        |
| Pick     | 特定のプロパティだけ抽出           | DTO生成、APIレスポンス整形           |
| Omit     | 特定のプロパティを除外             | パスワード除外、公開用型作成         |

---

## Union操作系

- Exclude<T, U>
- Extract<T, U>
- NonNullable<T>

| 型          | 概要                        | 主な使用用途                 |
| ----------- | --------------------------- | ---------------------------- |
| Exclude     | Union型から特定の型を除外   | 不要な型の除外、条件型の補助 |
| Extract     | Union型から一致する型を抽出 | 型のフィルタリング           |
| NonNullable | null / undefined を除外     | APIレスポンスの安全化        |

---

## 関数系

- ReturnType<T>
- Parameters<T>
- ConstructorParameters<T>
- InstanceType<T>

| 型                    | 概要                           | 主な使用用途                |
| --------------------- | ------------------------------ | --------------------------- |
| ReturnType            | 関数の戻り値の型を取得         | API型共有、関数結果の再利用 |
| Parameters            | 関数の引数型をタプルで取得     | カスタムHooks、関数ラップ   |
| ConstructorParameters | クラスコンストラクタの引数取得 | DI、Factoryパターン         |
| InstanceType          | クラスのインスタンス型を取得   | クラスベース設計            |

---

## Promise / 非同期系

Awaited

| 型      | 概要                      | 主な使用用途         |
| ------- | ------------------------- | -------------------- |
| Awaited | Promiseの解決後の型を取得 | async関数、API型推論 |

```ts
type A = Awaited<Promise<string>>;
```

---

## 実務で特によく使うランキング

1. Partial
2. Omit
3. Pick
4. Record
5. ReturnType
6. Parameters
7. NonNullable
8. Awaited

---

## Pickの型制約

```ts
type Pick<T, K extends keyof T>
```

存在するプロパティだけ選ばせるため。

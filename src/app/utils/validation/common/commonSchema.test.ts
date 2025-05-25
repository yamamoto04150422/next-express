import {
  requiredString,
  minLengthSchema,
  maxLengthSchema,
  fixedLengthSchema,
  noLeadingTrailingWhitespace,
  dateRangeSchema,
  minArrayLength,
  maxArrayLength,
  arrayLengthRange,
} from "./commonSchema";

describe("commonSchema", () => {
  test("requiredString: 必須入力エラー", async () => {
    const schema = requiredString("名前");
    await expect(schema.validate("")).rejects.toThrow("名前を入力してください");
    await expect(schema.validate("テスト")).resolves.toBe("テスト");
  });

  test("minLengthSchema: 最小桁数エラー", async () => {
    const schema = minLengthSchema("パスワード", 6);
    await expect(schema.validate("123")).rejects.toThrow(
      "パスワードは6文字以上で入力してください"
    );
    await expect(schema.validate("123456")).resolves.toBe("123456");
  });

  test("maxLengthSchema: 最大桁数エラー", async () => {
    const schema = maxLengthSchema("ユーザー名", 10);
    await expect(schema.validate("12345678901")).rejects.toThrow(
      "ユーザー名は10文字以下で入力してください"
    );
    await expect(schema.validate("1234567890")).resolves.toBe("1234567890");
  });

  test("fixedLengthSchema: 固定文字数エラー", async () => {
    const schema = fixedLengthSchema("コード", 5);
    await expect(schema.validate("1234")).rejects.toThrow(
      "コードは5文字である必要があります"
    );
    await expect(schema.validate("123456")).rejects.toThrow(
      "コードは5文字である必要があります"
    );
    await expect(schema.validate("12345")).resolves.toBe("12345");
  });

  test("noLeadingTrailingWhitespace: 前後の空白エラー", async () => {
    const schema = noLeadingTrailingWhitespace("名前");
    await expect(schema.validate(" テスト")).rejects.toThrow(
      "名前の前後に空白を含めることはできません"
    );
    await expect(schema.validate("テスト ")).rejects.toThrow(
      "名前の前後に空白を含めることはできません"
    );
    await expect(schema.validate("テスト")).resolves.toBe("テスト");
  });

  test("dateRangeSchema: 日付範囲エラー", async () => {
    const start = new Date("2023-01-01");
    const end = new Date("2023-12-31");
    const schema = dateRangeSchema("日付", start, end);

    await expect(schema.validate(new Date("2022-12-31"))).rejects.toThrow(
      "日付はSun Jan 01 2023以降である必要があります"
    );
    await expect(schema.validate(new Date("2024-01-01"))).rejects.toThrow(
      "日付はSun Dec 31 2023以前である必要があります"
    );
    await expect(schema.validate(new Date("2023-06-01"))).resolves.toEqual(
      new Date("2023-06-01")
    );
  });

  //   test("requiredArray: 配列必須エラー", async () => {
  //     const schema = requiredArray("選択肢");
  //     await expect(schema.validate([])).rejects.toThrow(
  //       "選択肢を選択してください"
  //     );
  //     await expect(schema.validate(["A", "B"])).resolves.toEqual(["A", "B"]);
  //   });

  test("minArrayLength: 配列の最小数エラー", async () => {
    const schema = minArrayLength("選択肢", 2);
    await expect(schema.validate(["A"])).rejects.toThrow(
      "選択肢は最低2個以上必要です"
    );
    await expect(schema.validate(["A", "B"])).resolves.toEqual(["A", "B"]);
  });

  test("maxArrayLength: 配列の最大数エラー", async () => {
    const schema = maxArrayLength("選択肢", 3);
    await expect(schema.validate(["A", "B", "C", "D"])).rejects.toThrow(
      "選択肢は最大3個以下にしてください"
    );
    await expect(schema.validate(["A", "B", "C"])).resolves.toEqual([
      "A",
      "B",
      "C",
    ]);
  });

  test("arrayLengthRange: 配列の範囲エラー", async () => {
    const schema = arrayLengthRange("選択肢", 2, 4);
    await expect(schema.validate(["A"])).rejects.toThrow(
      "選択肢は最低2個以上必要です"
    );
    await expect(schema.validate(["A", "B", "C", "D", "E"])).rejects.toThrow(
      "選択肢は最大4個以下にしてください"
    );
    await expect(schema.validate(["A", "B", "C"])).resolves.toEqual([
      "A",
      "B",
      "C",
    ]);
  });
});

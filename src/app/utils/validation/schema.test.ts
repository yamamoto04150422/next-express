import {
  arrayRules,
  dateRules,
  numberRules,
  numericStringRules,
  stringRules,
} from "./schema";

describe("stringRules", () => {
  describe("requiredString", () => {
    const fieldName = "氏名";
    const errorMsg = `${fieldName}を入力してください`;
    const schema = stringRules.required(fieldName);

    test("値が存在して、通過すること", async () => {
      await expect(schema.validate("山田太郎")).resolves.toBe("山田太郎");
    });

    test("空文字またはundefined、nullの場合、エラーになること", async () => {
      await expect(schema.validate("")).rejects.toThrow(errorMsg);
      await expect(schema.validate(null)).rejects.toThrow(errorMsg);
      await expect(schema.validate(undefined)).rejects.toThrow(errorMsg);
    });
  });

  describe("maxLength", () => {
    const fieldName = "氏名";
    const length = 5;
    const maxLengthSchema = stringRules.maxLength(fieldName, length);
    const errorMsg = `${fieldName}は${length}文字以下で入力してください`;

    test("５文字以下の場合、通過すること", async () => {
      await expect(maxLengthSchema.validate("山田")).resolves.toBe("山田");
    });

    test("５文字以上の場合、エラーになること", async () => {
      await expect(maxLengthSchema.validate("山田太郎あいう")).rejects.toThrow(
        errorMsg
      );
    });
  });

  describe("regexNumber", () => {
    const regexNumberSchema = stringRules.regexNumber("半角数字");

    test("数字のみの場合、通過すること", async () => {
      await expect(regexNumberSchema.validate("1234567890")).resolves.toBe(
        "1234567890"
      );
    });

    test("空文字の場合、通過すること", async () => {
      await expect(regexNumberSchema.validate("")).resolves.toBe("");
    });

    test("半角スペースを含む場合、エラーになること", async () => {
      await expect(regexNumberSchema.validate("123 456")).rejects.toThrow(
        "半角数字を入力してください"
      );
    });

    test("全角数字を含む場合、エラーになること", async () => {
      await expect(regexNumberSchema.validate("１２３４５")).rejects.toThrow(
        "半角数字を入力してください"
      );
    });

    test("記号を含む場合、エラーになること", async () => {
      await expect(regexNumberSchema.validate("123#456")).rejects.toThrow(
        "半角数字を入力してください"
      );
    });
  });

  describe("regexNumberEn", () => {
    const regexNumberEnSchema = stringRules.regexNumberEn("半角英数字");

    test("半角英数字の場合、通過すること", async () => {
      await expect(regexNumberEnSchema.validate("12k34h45n7")).resolves.toBe(
        "12k34h45n7"
      );
    });

    test("空文字の場合、通過すること", async () => {
      await expect(regexNumberEnSchema.validate("")).resolves.toBe("");
    });

    test("半角スペースを含む場合、エラーになること", async () => {
      await expect(regexNumberEnSchema.validate("abc 456")).rejects.toThrow(
        "半角英数字を入力してください"
      );
    });

    test("全角文字を含む場合、エラーになること", async () => {
      await expect(
        regexNumberEnSchema.validate("ａｂｃ１２３")
      ).rejects.toThrow("半角英数字を入力してください");
    });

    test("記号を含む場合、エラーになること", async () => {
      await expect(regexNumberEnSchema.validate("abc#123")).rejects.toThrow(
        "半角英数字を入力してください"
      );
    });
  });

  describe("regexNumberEnSymbol", () => {
    const regexNumberEnSymbolSchema =
      stringRules.regexNumberEnSymbol("半角英数字記号");

    test("半角英数字記号で使用されている場合、通過すること", async () => {
      await expect(
        regexNumberEnSymbolSchema.validate("12k34h45n7@-!/?")
      ).resolves.toBe("12k34h45n7@-!/?");
    });

    test("空文字の場合、通過すること", async () => {
      await expect(regexNumberEnSymbolSchema.validate("")).resolves.toBe("");
    });

    test("半角スペースを含む場合、エラーになること", async () => {
      await expect(
        regexNumberEnSymbolSchema.validate("abc 123!")
      ).rejects.toThrow("半角英数字記号を入力してください");
    });

    test("全角文字を含む場合、エラーになること", async () => {
      await expect(
        regexNumberEnSymbolSchema.validate("ａｂｃ123!")
      ).rejects.toThrow("半角英数字記号を入力してください");
    });

    test("半角以外の記号を含む場合、エラーになること", async () => {
      await expect(
        regexNumberEnSymbolSchema.validate("abc123☆")
      ).rejects.toThrow("半角英数字記号を入力してください");
    });
  });

  describe("regexIsFullWidth", () => {
    const regexIsFullWidth = stringRules.regexIsFullWidth("全角文字");

    test("全角文字の場合、通過すること", async () => {
      await expect(regexIsFullWidth.validate("あいうえお")).resolves.toBe(
        "あいうえお"
      );
    });

    test("全角スペースのみを含む場合、通過すること", async () => {
      await expect(regexIsFullWidth.validate("　")).resolves.toBe("　");
    });

    test("空文字の場合、通過すること", async () => {
      await expect(regexIsFullWidth.validate("")).resolves.toBe("");
    });

    test("半角英数字を含む場合、エラーになること", async () => {
      await expect(regexIsFullWidth.validate("ＡＢＣabc123")).rejects.toThrow(
        "全角文字を入力してください"
      );
    });

    test("半角スペースを含む場合、エラーになること", async () => {
      await expect(regexIsFullWidth.validate("あ い う")).rejects.toThrow(
        "全角文字を入力してください"
      );
    });

    test("半角記号を含む場合、エラーになること", async () => {
      await expect(regexIsFullWidth.validate("＠＃＄%&")).rejects.toThrow(
        "全角文字を入力してください"
      );
    });

    test("半角カナを含む場合、エラーになること", async () => {
      await expect(regexIsFullWidth.validate("ｱｲｳｴｵ")).rejects.toThrow(
        "全角文字を入力してください"
      );
    });
  });

  describe("shiftJisCompatible", () => {
    const msgTemplate = "絵文字";
    const schema = stringRules.shiftJisCompatible(msgTemplate);

    test("SHIFT_JISに変換できる場合、通過すること", async () => {
      await expect(schema.validate("テスト１２３４ABC")).resolves.toBe(
        "テスト１２３４ABC"
      );
    });

    test("SHIFT_JISに変換できない場合、エラーになること", async () => {
      await expect(schema.validate("テスト✅️")).rejects.toThrow(
        `${msgTemplate}を入力してください`
      );
    });

    test("空文字またはundefiendの場合、通過すること", async () => {
      await expect(schema.validate("")).resolves.toBe("");
      await expect(schema.validate(undefined)).resolves.toBe(undefined);
    });
  });
});

describe("numericStringRules", () => {
  describe("requiredNumber", () => {
    const msgTemplate = "年齢";
    const stringSchema = numericStringRules.requiredNumber(msgTemplate);

    const errorMsg = `${msgTemplate}を入力してください`;

    test("数値が入力された場合、通過すること", async () => {
      await expect(stringSchema.validate("22")).resolves.toBe("22");
    });

    test("数値以外が入力された場合、エラーになること", async () => {
      await expect(stringSchema.validate("あ")).rejects.toThrow(
        `${msgTemplate}は半角数字で入力してください`
      );
    });

    test("空文字またはundefined、nullは、エラーになること", async () => {
      await expect(stringSchema.validate("")).rejects.toThrow(errorMsg);
      await expect(stringSchema.validate(undefined)).rejects.toThrow(errorMsg);
      await expect(stringSchema.validate(null)).rejects.toThrow(errorMsg);
    });
  });

  describe("createNumberRange", () => {
    const msgTemplate = "金額";
    const stringSchema = numericStringRules.createNumberRange(
      msgTemplate,
      "start",
      "end"
    );

    const createRangeData = (
      start: string | number | undefined | null,
      end: string | number | undefined | null
    ) => ({
      start,
      end,
    });

    test("開始値または終了値が数値以外の場合、エラーになること", async () => {
      await expect(
        stringSchema.validate(createRangeData("1", "か"))
      ).rejects.toThrow(`${msgTemplate}は半角数字で入力してください`);
      await expect(
        stringSchema.validate(createRangeData("あ", "2"))
      ).rejects.toThrow(`${msgTemplate}は半角数字で入力してください`);
    });

    test("開始値 <= 終了値の場合、通過すること", async () => {
      const validStringData = createRangeData("5", "7");

      await expect(stringSchema.validate(validStringData)).resolves.toBe(
        validStringData
      );
    });

    test("開始値 = 終了値の場合、通過すること", async () => {
      const validEqualStringData = createRangeData("7", "7");

      await expect(stringSchema.validate(validEqualStringData)).resolves.toBe(
        validEqualStringData
      );
    });

    test("開始値 > 終了値の場合、エラーになること", async () => {
      const invalidStringRange = createRangeData("7", "5");

      await expect(stringSchema.validate(invalidStringRange)).rejects.toThrow(
        `${msgTemplate}は${invalidStringRange.end}以下の値を入力してください`
      );
    });
  });

  describe("minValue", () => {
    const minValue = 3;
    const msgTemplate = "数量";
    const stringSchema = numericStringRules.minValue(msgTemplate, minValue);

    const errorMsg = `${minValue}より大きい数値を入力してください`;

    test("数値以外の場合、エラーになること", async () => {
      await expect(stringSchema.validate("あ")).rejects.toThrow(
        `${msgTemplate}は半角数字で入力してください`
      );
    });

    test("空文字またはundefinedの場合、通過すること", async () => {
      await expect(stringSchema.validate("")).resolves.toBe("");
      await expect(stringSchema.validate(undefined)).resolves.toBe(undefined);
    });

    test("３より大きい場合、通過すること", async () => {
      await expect(stringSchema.validate("3")).resolves.toBe("3");
    });

    test("３より小さい場合、エラーになること", async () => {
      await expect(stringSchema.validate("2")).rejects.toThrow(errorMsg);
    });
  });

  describe("maxValue", () => {
    const maxValue = 5;
    const msgTemplate = "数量";
    const stringSchema = numericStringRules.maxValue(msgTemplate, maxValue);
    const errorMsg = `${maxValue}より小さい数値を入力してください`;

    test("数値以外の場合、エラーになること", async () => {
      await expect(stringSchema.validate("あ")).rejects.toThrow(
        `${msgTemplate}は半角数字で入力してください`
      );
    });

    test("空文字またはundefinedの場合、通過すること", async () => {
      await expect(stringSchema.validate("")).resolves.toBe("");
      await expect(stringSchema.validate(undefined)).resolves.toBe(undefined);
    });

    test("５より小さい場合、通過すること", async () => {
      await expect(stringSchema.validate("5")).resolves.toBe("5");
    });

    test("５より大きい場合、エラーになること", async () => {
      await expect(stringSchema.validate("10")).rejects.toThrow(errorMsg);
    });
  });

  describe("integerNumber", () => {
    const msgTemplate = "数量";
    const stringSchema = numericStringRules.integerNumber(msgTemplate);
    const errorMsg = `${msgTemplate}は整数で入力してください`;

    test("数値以外の場合、エラーになること", async () => {
      await expect(stringSchema.validate("あ")).rejects.toThrow(
        `${msgTemplate}は半角数字で入力してください`
      );
    });

    test("整数の場合、通過すること", async () => {
      await expect(stringSchema.validate("3")).resolves.toBe("3");
    });

    test("整数でない場合、エラーになること", async () => {
      await expect(stringSchema.validate("3.14")).rejects.toThrow(errorMsg);
    });
  });

  describe("decimalMin", () => {
    const maxDecimals = 3;
    const msgTemplate = "数量";
    const stringSchema = numericStringRules.decimalMin(
      msgTemplate,
      maxDecimals
    );

    const errorMsg = `小数点以下は${maxDecimals}桁以内で入力してください`;

    test("数値以外の場合、エラーになること", async () => {
      await expect(stringSchema.validate("あ")).rejects.toThrow(
        `${msgTemplate}は半角数字で入力してください`
      );
    });

    test("小数点以下が３桁以下の場合、通過すること", async () => {
      await expect(stringSchema.validate("9.999")).resolves.toBe("9.999");
    });

    test("小数点以下が３桁以上の場合、エラーになること", async () => {
      await expect(stringSchema.validate("9.9999")).rejects.toThrow(errorMsg);
    });
  });

  describe("maxTotalDigits", () => {
    const msgTemplate = "数量";
    const maxDigits = 4;
    const stringSchema = numericStringRules.maxTotalDigits(
      msgTemplate,
      maxDigits
    );
    const errorMsg = `${msgTemplate}は${maxDigits}桁以下で入力してください`;

    test("４桁以下の場合、通過すること", async () => {
      await expect(stringSchema.validate("1234")).resolves.toBe("1234");
      await expect(stringSchema.validate("1.234")).resolves.toBe("1.234");
    });

    test("４桁以上場合、エラーになること", async () => {
      await expect(stringSchema.validate("12345")).rejects.toThrow(errorMsg);
      await expect(stringSchema.validate("1.2345")).rejects.toThrow(errorMsg);
    });
  });
});

describe("numberRules", () => {
  describe("requiredNumber", () => {
    const msgTemplate = "年齢";
    const numberSchema = numberRules.requiredNumber(msgTemplate);

    const errorMsg = `${msgTemplate}を入力してください`;

    test("数値が入力された場合、通過すること", async () => {
      await expect(numberSchema.validate(22)).resolves.toBe(22);
    });

    test("undefined、nullは、エラーになること", async () => {
      await expect(numberSchema.validate(undefined)).rejects.toThrow(errorMsg);
      await expect(numberSchema.validate(null)).rejects.toThrow(errorMsg);
    });
  });

  describe("createNumberRange", () => {
    const msgTemplate = "金額";
    const numberSchema = numberRules.createNumberRange(
      msgTemplate,
      "start",
      "end"
    );

    const createRangeData = (
      start: number | undefined | null,
      end: number | undefined | null
    ) => ({
      start,
      end,
    });

    test("nullの場合、通過すること", async () => {
      const validNullData = createRangeData(null, null);

      await expect(numberSchema.validate(validNullData)).resolves.toBe(
        validNullData
      );
    });

    test("開始値 <= 終了値の場合、通過すること", async () => {
      const validNumberData = createRangeData(5, 7);

      await expect(numberSchema.validate(validNumberData)).resolves.toBe(
        validNumberData
      );
    });

    test("開始値 = 終了値の場合、通過すること", async () => {
      const validEqualNumberData = createRangeData(7, 7);

      await expect(numberSchema.validate(validEqualNumberData)).resolves.toBe(
        validEqualNumberData
      );
    });

    test("開始値 > 終了値の場合、エラーになること", async () => {
      const invalidNumberRange = createRangeData(7, 5);

      await expect(numberSchema.validate(invalidNumberRange)).rejects.toThrow(
        `${msgTemplate}は${invalidNumberRange.end}以下の値を入力してください`
      );
    });
  });

  describe("minValue", () => {
    const minValue = 3;
    const numberSchema = numberRules.minValue(minValue);

    const errorMsg = `${minValue}より大きい数値を入力してください`;

    test("nullの場合、通過すること", async () => {
      await expect(numberSchema.validate(null)).resolves.toBe(null);
    });

    test("３より大きい場合、通過すること", async () => {
      await expect(numberSchema.validate(3)).resolves.toBe(3);
    });

    test("３より小さい場合、エラーになること", async () => {
      await expect(numberSchema.validate(2)).rejects.toThrow(errorMsg);
    });
  });

  describe("maxValue", () => {
    const maxValue = 5;
    const numberSchema = numberRules.maxValue(maxValue);
    const errorMsg = `${maxValue}より小さい数値を入力してください`;

    test("nullの場合、通過すること", async () => {
      await expect(numberSchema.validate(null)).resolves.toBe(null);
    });

    test("５より小さい場合、通過すること", async () => {
      await expect(numberSchema.validate(5)).resolves.toBe(5);
    });

    test("５より大きい場合、エラーになること", async () => {
      await expect(numberSchema.validate(10)).rejects.toThrow(errorMsg);
    });
  });

  describe("integerNumber", () => {
    const msgTemplate = "数量";
    const numberSchema = numberRules.integerNumber(msgTemplate);

    const errorMsg = `${msgTemplate}は整数で入力してください`;

    test("nullの場合、通過すること", async () => {
      await expect(numberSchema.validate(null)).resolves.toBe(null);
    });

    test("整数の場合、通過すること", async () => {
      await expect(numberSchema.validate(3)).resolves.toBe(3);
    });

    test("整数でない場合、エラーになること", async () => {
      await expect(numberSchema.validate(3.14)).rejects.toThrow(errorMsg);
    });
  });

  describe("decimalMin", () => {
    const maxDecimals = 3;
    const numberSchema = numberRules.decimalMin(maxDecimals);

    const errorMsg = `小数点以下は${maxDecimals}桁以内で入力してください`;

    test("nullの場合、通過すること", async () => {
      await expect(numberSchema.validate(null)).resolves.toBe(null);
    });

    test("小数点以下が３桁以下の場合、通過すること", async () => {
      await expect(numberSchema.validate(9.999)).resolves.toBe(9.999);
    });

    test("小数点以下が３桁以上の場合、エラーになること", async () => {
      await expect(numberSchema.validate(9.9999)).rejects.toThrow(errorMsg);
    });
  });

  describe("maxTotalDigits", () => {
    const msgTemplate = "数量";
    const maxDigits = 4;
    const numberSchema = numberRules.maxTotalDigits(msgTemplate, maxDigits);
    const errorMsg = `${msgTemplate}は${maxDigits}桁以下で入力してください`;

    test("nullの場合、通過すること", async () => {
      await expect(numberSchema.validate(null)).resolves.toBe(null);
    });

    test("４桁以下の場合、通過すること", async () => {
      await expect(numberSchema.validate(1234)).resolves.toBe(1234);
      await expect(numberSchema.validate(1.234)).resolves.toBe(1.234);
    });

    test("４桁以上場合、エラーになること", async () => {
      await expect(numberSchema.validate(12345)).rejects.toThrow(errorMsg);
      await expect(numberSchema.validate(1.2345)).rejects.toThrow(errorMsg);
    });
  });
});

describe("dateRules", () => {
  describe("fromToDateRange", () => {
    const fieldName = "契約期間";
    const schema = dateRules.fromToDateRange(fieldName, "startDate", "endDate");

    test("開始日 < 終了日の場合、通過すること", async () => {
      const validData = {
        startDate: "2025/04/21",
        endDate: "2025/04/23",
      };

      await expect(schema.validate(validData)).resolves.toEqual(validData);
    });

    test("開始日 = 終了日の場合、通過すること", async () => {
      const validData = {
        startDate: "2025/04/21",
        endDate: "2025/04/21",
      };

      await expect(schema.validate(validData)).resolves.toEqual(validData);
    });

    test("開始日 > 終了日の場合、エラーになること", async () => {
      const validData = {
        startDate: "2025/05/22",
        endDate: "2025/04/21",
      };
      const endDate = validData.endDate;

      await expect(schema.validate(validData)).rejects.toThrow(
        `${fieldName}は${endDate}以前の日付を入力してください`
      );
    });
  });
});

describe("arrayRules", () => {
  describe("requiredArray", () => {
    const fieldName = "テスト";
    const schema = arrayRules.requiredArray(fieldName);

    test("配列が指定されている場合、通過すること", async () => {
      await expect(schema.validate(["item1", "item2"])).resolves.toEqual([
        "item1",
        "item2",
      ]);
    });

    test("配列が空の場合、エラーになること", async () => {
      await expect(schema.validate([])).rejects.toThrow(
        `${fieldName}を入力してください`
      );
    });
  });
});

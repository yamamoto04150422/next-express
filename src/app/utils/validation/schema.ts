import * as Yup from "yup";
import Encoding from "encoding-japanese";

/**
 * 再利用可能な形でyupの定義のみを行います。
 */
export const stringRules = {
  // 必須チェック
  required: (msgTemplate: string) =>
    Yup.string().required(`${msgTemplate}を入力してください`),

  // 最大桁チェック
  maxLength: (msgTemplate: string, length: number) =>
    Yup.string().max(
      length,
      `${msgTemplate}は${length}文字以下で入力してください`
    ),

  // 半数値チェック
  regexNumber: (msgTemplate: string) =>
    Yup.string().matches(/^[0-9]+$/, {
      message: `${msgTemplate}を入力してください`,
      excludeEmptyString: true,
    }),

  // 半英数チェック
  regexNumberEn: (msgTemplate: string) =>
    Yup.string().matches(/^[a-zA-Z0-9]+$/, {
      message: `${msgTemplate}を入力してください`,
      excludeEmptyString: true,
    }),

  // 半英数記チェック
  regexNumberEnSymbol: (msgTemplate: string) =>
    Yup.string().matches(/^[\x21-\x7E]+$/, {
      message: `${msgTemplate}を入力してください`,
      excludeEmptyString: true,
    }),

  // 全角文字チェック
  regexIsFullWidth: (msgTemplate: string) =>
    Yup.string().matches(/^[^ -~｡-ﾟ]+$/, {
      message: `${msgTemplate}を入力してください`,
      excludeEmptyString: true,
    }),

  // shift-jisチェック
  shiftJisCompatible: (msgTemplate: string) =>
    Yup.string().test(
      "is-shift-jis-compatible",
      `${msgTemplate}を入力してください`,
      (value) => {
        if (!value) return true;

        const unicodeArray = Encoding.stringToCode(value);
        const shitJisArray = Encoding.convert(unicodeArray, {
          to: "SJIS",
          from: "UNICODE",
          type: "array",
        });

        const decoded = Encoding.codeToString(
          Encoding.convert(shitJisArray, {
            to: "UNICODE",
            from: "SJIS",
            type: "array",
          })
        );

        return value === decoded;
      }
    ),
};

// 半角数字であることを確認
const baseNumericString = (msgTemplate: string, allowDecimal?: boolean) => {
  let pattern = "0-9";

  if (allowDecimal) pattern += "\\.";

  const regex = new RegExp(`^[${pattern}]+$`);

  return Yup.string().matches(regex, {
    message: `${msgTemplate}は半角数字で入力してください`,
    excludeEmptyString: true,
  });
};

// string型の数字入力チェック
export const numericStringRules = {
  // 必須チェック
  requiredNumber: (msgTemplate: string) =>
    baseNumericString(msgTemplate).required(`${msgTemplate}を入力してください`),

  // 開始値と終了値の前後関係チェック
  createNumberRange: (msgTemplate: string, startKey: string, endKey: string) =>
    Yup.object().shape({
      [endKey]: baseNumericString(msgTemplate),
      [startKey]: baseNumericString(msgTemplate).test(
        "start-before-end",
        function () {
          const { [startKey]: start, [endKey]: end } = this.parent;

          if (start <= end) return true;

          return this.createError({
            message: `${msgTemplate}は${end}以下の値を入力してください`,
            path: startKey,
          });
        }
      ),
    }),

  // 最小値
  minValue: (msgTemplate: string, minValue: number) =>
    baseNumericString(msgTemplate, true).test(
      "min-value",
      `${minValue}より大きい数値を入力してください`,
      (value) => {
        if (!value || value === "") return true; // 空は許容
        const number = Number(value);

        return !isNaN(number) && number >= minValue;
      }
    ),

  // 最大値
  maxValue: (msgTemplate: string, maxValue: number) =>
    baseNumericString(msgTemplate, true).test(
      "max-value",
      `${maxValue}より小さい数値を入力してください`,
      (value) => {
        if (!value || value === "") return true; // 空は許容
        const number = Number(value);

        return !isNaN(number) && number <= maxValue;
      }
    ),

  // 整数チェック
  integerNumber: (msgTemplate: string) =>
    baseNumericString(msgTemplate, true).matches(/^[0-9]+$/, {
      message: `${msgTemplate}は整数で入力してください`,
      excludeEmptyString: true,
    }),

  // 小数点以下の最大桁数チェック
  decimalMin: (msgTemplate: string, maxDecimals: number) =>
    baseNumericString(msgTemplate, true).test(
      "max-decimals",
      `小数点以下は${maxDecimals}桁以内で入力してください`,
      (value) => {
        if (value != undefined) {
          const decimalPart = value.toString().split(".")[1];

          return !decimalPart || decimalPart.length <= maxDecimals;
        }
      }
    ),

  // 最大桁チェック
  maxTotalDigits: (msgTemplate: string, maxDigits: number) =>
    baseNumericString(msgTemplate, true).test(
      "max-total-digits",
      `${msgTemplate}は${maxDigits}桁以下で入力してください`,
      (value) => {
        if (value != undefined) {
          // 小数点を排除
          const digits = value.toString().replace(".", "");

          return digits.length <= maxDigits;
        }
      }
    ),
};

// number型の数値入力チェック
export const numberRules = {
  requiredNumber: (msgTemplate: string) =>
    Yup.number().required(`${msgTemplate}を入力してください`),

  // 開始値と終了値の前後関係チェック
  createNumberRange: (msgTemplate: string, startKey: string, endKey: string) =>
    Yup.object().shape({
      [endKey]: Yup.number().nullable(),
      [startKey]: Yup.number()
        .nullable()
        .test("start-before-end", function () {
          const { [startKey]: start, [endKey]: end } = this.parent;

          if (start <= end) return true;

          return this.createError({
            message: `${msgTemplate}は${end}以下の値を入力してください`,
            path: startKey,
          });
        }),
    }),

  // 最小値
  minValue: (minValue: number) =>
    Yup.number()
      .min(minValue, `${minValue}より大きい数値を入力してください`)
      .nullable(),

  // 最大値
  maxValue: (maxValue: number) =>
    Yup.number()
      .max(maxValue, `${maxValue}より小さい数値を入力してください`)
      .nullable(),

  // 整数チェック
  integerNumber: (msgTemplate: string) =>
    Yup.number().integer(`${msgTemplate}は整数で入力してください`).nullable(),

  // 小数点以下の最大桁数チェック
  decimalMin: (maxDecimals: number) =>
    Yup.number()
      .nullable()
      .test(
        "max-decimals",
        `小数点以下は${maxDecimals}桁以内で入力してください`,
        (value) => {
          if (value === null || value === undefined) return true;

          const decimalPart = value.toString().split(".")[1];

          return !decimalPart || decimalPart.length <= maxDecimals;
        }
      ),

  // 最大桁チェック
  maxTotalDigits: (msgTemplate: string, maxDigits: number) =>
    Yup.number()
      .test(
        "max-total-digits",
        `${msgTemplate}は${maxDigits}桁以下で入力してください`,
        (value) => {
          if (value === null || value === undefined) return true;

          // 小数点を排除
          const digits = value.toString().replace(".", "");

          return digits.length <= maxDigits;
        }
      )
      .nullable(),
};

export const dateRules = {
  // 開始日と終了日の前後関係チェック
  fromToDateRange: (msgTemplate: string, startKey: string, endKey: string) =>
    Yup.object().shape({
      [startKey]: Yup.string(),
      [endKey]: Yup.string().test("start-before-end", function () {
        const start = new Date(this.parent[startKey]);
        const end = new Date(this.parent[endKey]);
        // YYYY/MM/DD文字列に変換
        const formatDate = (date: Date) => {
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");

          return `${year}/${month}/${day}`;
        };

        if (formatDate(start) <= formatDate(end)) return true;

        return this.createError({
          message: `${msgTemplate}は${formatDate(end)}以前の日付を入力してください`,
          path: startKey,
        });
      }),
    }),
};

export const arrayRules = {
  // 必須チェック
  requiredArray: (msgTemplate: string) =>
    Yup.array().defined().min(1, `${msgTemplate}を入力してください`),
};

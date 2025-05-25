import * as Yup from "yup";

/** 必須入力 */
export const requiredString = (fildName: string) =>
  Yup.string().required(`${fildName}を入力してください`);

/** 最小桁 */
export const minLengthSchema = (fildName: string, length: number) =>
  Yup.string()
    .defined()
    .min(length, `${fildName}は${length}文字以上で入力してください`);
/** 最大桁 */
export const maxLengthSchema = (fildName: string, length: number) =>
  Yup.string()
    .defined()
    .max(length, `${fildName}は${length}文字以下で入力してください`);

/** 固定文字数 */
export const fixedLengthSchema = (fildName: string, length: number) =>
  Yup.string()
    .defined()
    .min(length, `${fildName}は${length}文字である必要があります`)
    .max(length, `${fildName}は${length}文字である必要があります`);

/** 前後の空白をエラー */
export const noLeadingTrailingWhitespace = (fieldName: string) =>
  Yup.string()
    .test(
      "no-whitespace",
      `${fieldName}の前後に空白を含めることはできません`,
      (value) => value === value?.trim()
    )
    .defined();

/** 日付の範囲チェック (未検証) */
export const dateRangeSchema = (fildName: string, start: Date, end: Date) =>
  Yup.date()
    .defined()
    .min(start, `${fildName}は${start.toDateString()}以降である必要があります`)
    .max(end, `${fildName}は${end.toDateString()}以前である必要があります`);

/** 配列の空白 */
export const requiredArray = (fieldName: string) =>
  Yup.array().required(`${fieldName}を選択してください`);

/** 配列の最小数 */
export const minArrayLength = (fieldName: string, min: number) =>
  Yup.array().min(min, `${fieldName}は最低${min}個以上必要です`);

/** 配列の最大数 */
export const maxArrayLength = (fieldName: string, max: number) =>
  Yup.array()
    .defined()
    .max(max, `${fieldName}は最大${max}個以下にしてください`);

/** 配列の範囲チェック */
export const arrayLengthRange = (fieldName: string, min: number, max: number) =>
  Yup.array()
    .defined()
    .min(min, `${fieldName}は最低${min}個以上必要です`)
    .max(max, `${fieldName}は最大${max}個以下にしてください`);

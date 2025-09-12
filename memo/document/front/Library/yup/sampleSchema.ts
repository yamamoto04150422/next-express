import * as Yup from "yup";

const parsePath = (path: string) => {
  const match = path.match(/\[(\d+)\]\.(.+)/);
  if (!match) return null;
  return {
    rowIndex: Number(match[1]) + 1,
    fieldName: match[2],
  };
};

export const stringRules = {
  stringRequired: Yup.string().required(({ path }) => {
    const parsed = parsePath(path);

    if (parsed) {
      return `テーブル ${parsed.rowIndex}行目:${parsed.fieldName}は必須入力です。`;
    }
    return "必須入力です。";
  }),

  // 最大桁チェック
  maxLength: (msgTemplate: string, length: number) =>
    Yup.string().max(length, ({ path }) => {
      const parsed = parsePath(path);

      if (parsed) {
        return `テーブル ${parsed.rowIndex}行目:${parsed.fieldName}文字以下で入力してください。`;
      }
      return `${length}文字以下で入力してください`;
    }),

  // 半数値チェック
  regexNumber: (msgTemplate: string) =>
    Yup.string().matches(/^[0-9]+$/, {
      message: ({ path }) => {
        const parsed = parsePath(path);
        if (parsed) {
          return `テーブル ${parsed.rowIndex}行目:${parsed.fieldName}は${msgTemplate}を入力してください`;
        }
        return `${msgTemplate}を入力してください`;
      },
      excludeEmptyString: true,
    }),
};

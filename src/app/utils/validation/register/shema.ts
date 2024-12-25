import {
  maxLengthSchema,
  minLengthSchema,
  noLeadingTrailingWhitespace,
  requiredString,
} from "../commonShema";

const userInfo = "ユーザ名称";
export const userNameSchema = requiredString(userInfo)
  .concat(minLengthSchema(userInfo, 2))
  .concat(maxLengthSchema(userInfo, 5))
  .concat(noLeadingTrailingWhitespace(userInfo));

// const status = "ステータス";
// export const statusesSchema = requiredArray(status).concat(
//   minArrayLength(status, 2).concat(maxArrayLength(status, 3))
// );

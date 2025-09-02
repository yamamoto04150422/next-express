# 定数

よく利用する記載

```ts
export const Status = {
  APPROVAL: "approval",
  REGISTRATION: "registration",
} as const;

export type StatusType = (typeof Status)[keyof typeof Status];

export type bulkGroupEstimateListStatusType = Extract<
  StatusType,
  "registration" | "approval"
>;
```

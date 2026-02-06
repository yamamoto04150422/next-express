"use client";

import { Grid, GridItem } from "@/styles/grid/Grid";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserBody } from "@/app/openApi/generated/zod/users/users";
import { validateOrderQueryParams } from "@/app/openApi/generated/zod/orders/orders";
import type { z } from "zod";

const formSchema = createUserBody.extend({
  // numberチェック用のサンプル項目（注文金額イメージ）
  amount: validateOrderQueryParams.shape.amount,
});

type FormValues = z.infer<typeof formSchema>;

const ZodSamplePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      amount: undefined,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("validated data:", data);
    alert("バリデーション成功しました！");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        <GridItem $isLabel={true}>
          <p style={{ fontWeight: "bold" }}>ユーザー名</p>
        </GridItem>
        <GridItem $isLabel={false}>
          <div style={{ width: "100%" }}>
            <InputText className="w-full" {...register("username")} />
            {errors.username && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                {errors.username.message}
              </p>
            )}
          </div>
        </GridItem>

        <GridItem $isLabel={true}>
          <p style={{ fontWeight: "bold" }}>メールアドレス</p>
        </GridItem>
        <GridItem $isLabel={false}>
          <div style={{ width: "100%" }}>
            <InputText className="w-full" {...register("email")} />
            {errors.email && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                {errors.email.message}
              </p>
            )}
          </div>
        </GridItem>

        <GridItem $isLabel={true}>
          <p style={{ fontWeight: "bold" }}>パスワード</p>
        </GridItem>
        <GridItem $isLabel={false}>
          <div style={{ width: "100%" }}>
            <InputText
              className="w-full"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                {errors.password.message}
              </p>
            )}
          </div>
        </GridItem>

        <GridItem $isLabel={true}>
          <p style={{ fontWeight: "bold" }}>金額（numberチェック）</p>
        </GridItem>
        <GridItem $isLabel={false}>
          <div style={{ width: "100%" }}>
            <InputText
              className="w-full"
              type="number"
              // React Hook Form 側は string で受け取り、Zod 側で number 変換＆チェック
              {...register("amount", {
                valueAsNumber: true,
              })}
            />
            {errors.amount && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                {errors.amount.message}
              </p>
            )}
          </div>
        </GridItem>
      </Grid>

      <div style={{ marginTop: "16px" }}>
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
          }}
        >
          送信
        </button>
      </div>
    </form>
  );
};

export default ZodSamplePage;


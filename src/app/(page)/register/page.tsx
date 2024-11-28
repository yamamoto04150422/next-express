"use client";

import MaskedCalendar from "@/app/components/molecules/maskedCalendar/MaskedCalendar";
import { COLUMN_POSITIONS, Grid, GridItem } from "@/styles/grid/Grid";
import { Affiliation } from "@/types/affiliation/Affiliation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Steps } from "primereact/steps";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const items = [
  {
    label: "仮登録",
  },
  {
    label: "認証",
  },
  {
    label: "登録完了",
  },
];
type FormValues = {
  username: string;
  name: string;
};

const fetchAffiliations = async (): Promise<Affiliation[]> => {
  const response = await fetch("/api/affiliations");
  if (!response.ok) {
    throw new Error("データの取得に失敗しました");
  }
  return response.json();
};

export default function RegisterPage() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  // 初期データを取得
  const {
    data: affiliations,
    error,
    isLoading,
  } = useQuery<Affiliation[], Error>({
    queryKey: ["affiliations"], // キャッシュキー
    queryFn: fetchAffiliations, // データ取得関数
    enabled: isButtonClicked, // ボタンがクリックされたときにのみ実行
    staleTime: 5 * 60 * 1000, // 5分間はデータを再フェッチしない
  });

  const onClickAffiliations = () => {
    setIsButtonClicked(true); // ボタンクリック時にデータ取得を有効にする
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  // バリデーションスキーマ
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("ユーザー名は必須です")
      .min(3, "ユーザー名は3文字以上である必要があります"),
    name: yup.string().required("名称は必須です"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema), // yupを適用
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="card">
        <Steps model={items} activeIndex={0} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={styles.container}>
          <Card
            title="新規会員登録"
            footer={<Button type="submit">登録</Button>}
            style={{ width: "85%" }}
          >
            <Grid>
              <GridItem $isLabel={true}>
                <p>ユーザー名:</p>
              </GridItem>
              <GridItem $isLabel={false}>
                <div className="w-full">
                  <InputText
                    type="text"
                    {...register("username", {
                      required: "ユーザー名は必須です",
                    })}
                  />
                  {errors.username && (
                    <p style={{ color: "red" }}>{errors.username.message}</p>
                  )}
                </div>
              </GridItem>
              <GridItem
                $isLabel={true}
                $column={COLUMN_POSITIONS.pc.rightLabelWidth}
              >
                <p>名称:</p>
              </GridItem>
              <GridItem
                $isLabel={false}
                $column={COLUMN_POSITIONS.pc.rightInputWidth}
              >
                <div className="w-full">
                  <InputText
                    type="text"
                    {...register("name", { required: "名称は必須です" })}
                  />
                  {errors.name && (
                    <p style={{ color: "red" }}>{errors.name.message}</p>
                  )}
                </div>
              </GridItem>
            </Grid>
            <Grid>
              <GridItem $isLabel={true}>
                <p>住所:</p>
              </GridItem>
              <GridItem $isLabel={false}>
                <InputText type="text" />
              </GridItem>
            </Grid>
            <Grid>
              <GridItem $isLabel={true}>
                <p>生年月日:</p>
              </GridItem>
              <GridItem $isLabel={false}>
                <MaskedCalendar id="birthDay" colorChangeDates={[]} />
              </GridItem>
            </Grid>
            <Grid>
              <GridItem $isLabel={true}>
                <p>所属:</p>
              </GridItem>
              <GridItem $isLabel={false}>
                <div className="p-inputgroup flex-1">
                  <InputText type="text" />
                  <Button
                    type="button"
                    icon="pi pi-search"
                    onClick={onClickAffiliations}
                  />
                </div>
              </GridItem>
            </Grid>
            {affiliations && (
              <div>
                {affiliations.map((item) => (
                  <p key={item.id}>
                    {item.id} / {item.name}
                  </p>
                ))}
              </div>
            )}
          </Card>
        </div>
      </form>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // width: "60%",
    // minWidth: "300px",
  },
};

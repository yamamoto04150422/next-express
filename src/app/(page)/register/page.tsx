"use client";

import MaskedCalendar from "@/app/components/molecules/maskedCalendar/MaskedCalendar";
import { COLUMN_POSITIONS, Grid, GridItem } from "@/styles/grid/Grid";
import { Affiliation } from "@/types/affiliation/Affiliation";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Steps } from "primereact/steps";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Chip } from "primereact/chip";

const items = [
  {
    label: "仮登録",
  },
  {
    label: "プラン選択",
  },
  {
    label: "登録完了",
  },
];
const chips = [
  { label: "Apple", icon: "pi pi-apple" },
  { label: "Facebook", icon: "pi pi-facebook", removable: true },
  { label: "Google", icon: "pi pi-google", removable: true },
  { label: "Microsoft", icon: "pi pi-microsoft", removable: true },
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
  const [affiliations, setAffiliations] = useState<Affiliation[]>([]);

  const [selectedValue, setSelectedValue] = useState("");

  const [step, setStep] = useState(0);

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

  const onClickAffiliations = async () => {
    const data = await fetchAffiliations();
    setAffiliations(data);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    setStep(1);
  };

  // ボタンのアクション
  const onButtonClick = (rowData: Affiliation) => {
    setSelectedValue(rowData.name);
    setAffiliations([]);
  };

  // アクションボタンのテンプレート
  const actionTemplate = (rowData: Affiliation) => {
    return (
      <Button
        label="選択"
        type="button"
        onClick={() => onButtonClick(rowData)}
      />
    );
  };

  return (
    <>
      {step === 0 && (
        <div>
          <Steps model={items} activeIndex={step} />
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
                        <p style={{ color: "red" }}>
                          {errors.username.message}
                        </p>
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
                      <InputText
                        type="text"
                        name="grop"
                        value={selectedValue}
                      />
                      <Button
                        type="button"
                        icon="pi pi-search"
                        onClick={onClickAffiliations}
                      />
                    </div>
                  </GridItem>
                </Grid>
                <div style={{ padding: 20 }}>
                  {affiliations.length > 0 && (
                    <div>
                      <DataTable value={affiliations} rowHover showGridlines>
                        <Column field="id" header="ID" />
                        <Column field="name" header="名称" />
                        <Column
                          body={actionTemplate}
                          style={{ width: "120px", textAlign: "center" }}
                        />
                      </DataTable>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </form>
        </div>
      )}
      {step === 1 && (
        <div>
          <Steps model={items} activeIndex={step} />
          <div style={{ padding: "30px 80px" }}>
            {chips.map((chip, index) => (
              <Chip
                key={chip.label}
                label={chip.label}
                icon={chip.icon}
                removable={chip.removable}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

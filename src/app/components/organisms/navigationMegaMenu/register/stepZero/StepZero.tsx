import MaskedCalendar from "@/app/components/molecules/maskedCalendar/MaskedCalendar";
import { COLUMN_POSITIONS, Grid, GridItem } from "@/styles/grid/Grid";
import { Affiliation } from "@/types/affiliation/Affiliation";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { useAtom } from "jotai";
import { formDataRegisterAtom } from "@/app/atoms/formDataAtom";
import { requiredString } from "@/app/utils/validation/commonShema";

export type FormValues = {
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

export default function StepZero({
  setStep,
}: {
  setStep: (step: number) => void;
}) {
  const [affiliations, setAffiliations] = useState<Affiliation[]>([]);

  const [selectedValue, setSelectedValue] = useState("");

  const [formData, setFormData] = useAtom(formDataRegisterAtom);

  // バリデーションスキーマ
  const schema = yup.object().shape({
    username: requiredString("ユーザ名"),
    name: requiredString("名称"),
  });

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: formData,
    resolver: yupResolver(schema), // yupを適用
  });

  const onClickAffiliations = async () => {
    const data = await fetchAffiliations();
    setAffiliations(data);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setFormData(data);
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
    <div style={styles.commonContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          title="新規会員登録"
          footer={
            <div style={styles.cardFooterButton}>
              <Button type="submit">登録</Button>
            </div>
          }
        >
          <Grid>
            <GridItem $isLabel={true}>
              <p>ユーザー名:</p>
            </GridItem>
            <GridItem $isLabel={false}>
              <div className="w-full">
                <Controller
                  name="username"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <InputText {...field} />
                      {error && <p style={{ color: "red" }}>{error.message}</p>}
                    </>
                  )}
                />
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
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <InputText {...field} />
                      {error && <p style={{ color: "red" }}>{error.message}</p>}
                    </>
                  )}
                />
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
                <InputText type="text" name="grop" value={selectedValue} />
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
      </form>
    </div>
  );
}

const styles = {
  commonContainer: {
    padding: "30px",
  },
  cardFooterButton: {
    display: "flex",
    justifyContent: "flex-end",
  },
};

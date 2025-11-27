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
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { formDataRegisterAtom } from "@/app/atoms/formDataAtom";
import { requiredString } from "@/app/utils/validation/common/commonSchema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Checkbox } from "primereact/checkbox";
import { api } from "../../../../../../../lib/axios";

// Types
export type FormValues = {
  username: string;
  name: string;
  agree: boolean;
  agreeOptions: string[];
  affiliation?: string;
};

// API Calls
const fetchAffiliations = async (param: string): Promise<Affiliation[]> => {
  try {
    const response = await api.get<Affiliation[]>("/api/affiliations", {
      params: { name: param },
    });
    return response.data;
  } catch (error) {
    console.error("登録エラー", error);
    throw new Error("データの取得に失敗しました");
  }
};

const registerUser = async (data: FormValues) => {
  try {
    const response = await api.post("/api/register", data);
    return response.data;
  } catch (error) {
    console.error("登録エラー", error);
    throw new Error("登録に失敗しました");
  }
};

// Validation Schema
const schema = yup.object().shape({
  username: requiredString("ユーザ名"),
  name: requiredString("名称"),
  agree: yup
    .boolean()
    .oneOf([true], "利用規約に同意する必要があります")
    .required(),
  agreeOptions: yup
    .array()
    .of(yup.string().required())
    .min(1, "1つ以上選択してください")
    .required("必須です"),
  affiliation: yup.string().optional(),
});

export default function StepZero({
  setStep,
}: {
  setStep: (step: number) => void;
}) {
  const [formData, setFormData] = useAtom(formDataRegisterAtom);

  console.log("jotai,formData", formData); // Jotaiのatomの値を確認

  const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      username: "",
      name: "",
      agree: false,
      agreeOptions: [],
      affiliation: "",
    },
    resolver: yupResolver(schema), // yupを適用
  });

  const searchKeywordRef = useRef("");

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["affiliations", searchKeywordRef.current],
    queryFn: () => fetchAffiliations(searchKeywordRef.current),
    retry: false, // エラー時に再試行しない
    enabled: false, // 初回は自動でフェッチしない
    refetchOnWindowFocus: false, // ウィンドウフォーカス時に再フェッチしない
    placeholderData: (prev) => prev, // 前回のデータをプレースホルダーとして使用
  });

  const [affiliationsData, setAffiliationsData] = useState<Affiliation[]>(
    data || []
  );

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // 成功時の処理（画面遷移など）
      console.log("登録成功", data);
      setStep(1);
    },
    onError: (error) => {
      console.error("登録エラー", error);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("data", data);
    setFormData(data); // Jotaiのatomに値をセット
    mutation.mutate(data);
  };

  const onClickTableButton = (rowData: Affiliation) => {
    setValue("affiliation", rowData.name); // useFormの値を更新
    setAffiliationsData([]);
  };

  const onClickAffiliations = () => {
    searchKeywordRef.current = watch("affiliation") ?? "";
    refetch();
  };

  // アクションボタンのテンプレート
  const actionTemplate = (rowData: Affiliation) => {
    return (
      <Button
        label="選択"
        type="button"
        onClick={() => onClickTableButton(rowData)}
      />
    );
  };

  useEffect(() => {
    // dataが更新されたときにaffiliationsを更新
    if (data) {
      setAffiliationsData(data);
    }
  }, [data]);

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
              <p>利用規約:</p>
            </GridItem>
            <GridItem $isLabel={false}>
              <div className="w-full">
                <Controller
                  name="agree"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <div style={{ display: "flex", textAlign: "center" }}>
                        <Checkbox
                          {...field}
                          inputId="agree"
                          checked={field.value ?? false}
                          onChange={(e) => field.onChange(e.checked)}
                        />
                        <label htmlFor="agree" className="ml-2">
                          利用規約に同意する
                        </label>
                      </div>
                      {error && <p style={{ color: "red" }}>{error.message}</p>}
                    </>
                  )}
                />
              </div>
            </GridItem>
          </Grid>

          <Grid>
            <GridItem $isLabel={true}>
              <p>オプション:</p>
            </GridItem>
            <GridItem $isLabel={false} $column="5 / 25">
              <Controller
                name="agreeOptions"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  const options = [
                    { label: "Aを受け取る", value: "optionA" },
                    { label: "Bに参加する", value: "optionB" },
                    { label: "Cを希望する", value: "optionC" },
                  ];

                  const handleChange = (
                    checked: boolean | undefined,
                    value: string
                  ) => {
                    const currentValues = field.value ?? []; // ← ここで undefined 回避
                    const newValue = checked
                      ? [...currentValues, value]
                      : currentValues.filter((v) => v !== value);
                    field.onChange(newValue);
                  };

                  return (
                    <div className="flex flex-col gap-2">
                      {options.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <Checkbox
                            inputId={option.value}
                            value={option.value}
                            checked={field.value?.includes(option.value)}
                            onChange={(e) =>
                              handleChange(e.checked, option.value)
                            }
                          />
                          <label htmlFor={option.value} className="ml-2">
                            {option.label}
                          </label>
                        </div>
                      ))}
                      {error && <p style={{ color: "red" }}>{error.message}</p>}
                    </div>
                  );
                }}
              />
            </GridItem>
          </Grid>

          <Grid>
            <GridItem $isLabel={true}>
              <p>所属:</p>
            </GridItem>
            <GridItem $isLabel={false}>
              <div className="p-inputgroup flex-1">
                <Controller
                  name="affiliation"
                  control={control}
                  render={({ field }) => (
                    <InputText
                      {...field}
                      type="text"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  )}
                />
                <Button
                  type="button"
                  icon="pi pi-search"
                  onClick={onClickAffiliations}
                  disabled={isFetching}
                />
              </div>
            </GridItem>
          </Grid>

          <p>ビルドエラー回避のために定義</p>
          <MaskedCalendar id="test" colorChangeDates={[]} />

          <div style={{ padding: 20 }}>
            {affiliationsData.length > 0 && (
              <div>
                <DataTable value={affiliationsData} rowHover showGridlines>
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

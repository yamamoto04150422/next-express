"use client";

import MaskedCalendar from "@/app/components/molecules/maskedCalendar/MaskedCalendar";
import { COLUMN_POSITIONS, Grid, GridItem } from "@/styles/grid/Grid";
import { Affiliation } from "@/types/affiliation/Affiliation";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Steps } from "primereact/steps";
import { useState } from "react";

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

export default function RegisterPage() {
  const [affiliations, setAffiliations] = useState<Affiliation[]>([]);
  const onClickAffiliations = async () => {
    try {
      const response = await fetch("/api/affiliations");
      if (!response.ok) {
        throw new Error("データの取得に失敗しました");
      }
      const data = await response.json();
      setAffiliations(data);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <>
      <div className="card">
        <Steps model={items} activeIndex={0} />
      </div>
      <div style={styles.container}>
        <Card
          title="新規会員登録"
          footer={<Button type="submit">登録</Button>}
          // style={{ width: "60%" }}
        >
          <form>
            <Grid>
              <GridItem $isLabel={true}>
                <p>ユーザー名:</p>
              </GridItem>
              <GridItem $isLabel={false}>
                <InputText type="text" name="username" />
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
                <InputText type="text" />
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
          </form>
        </Card>
      </div>
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

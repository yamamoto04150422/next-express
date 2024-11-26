"use client";

import { COLUMN_POSITIONS, Grid, GridItem } from "@/styles/grid/Grid";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Steps } from "primereact/steps";

export const items = [
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

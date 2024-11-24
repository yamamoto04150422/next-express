"use client";

import { Grid, GridItem } from "@/styles/grid/Grid";
import { InputText } from "primereact/inputtext";

const Sample = () => {
  return (
    <>
      <Grid>
        <GridItem $isLabel={true}>
          <p style={{ fontWeight: "bold" }}>組織１組織１組織１組織１</p>
        </GridItem>
        <GridItem $isLabel={false}>
          <InputText className="w-full" />
        </GridItem>
      </Grid>
    </>
  );
};

export default Sample;

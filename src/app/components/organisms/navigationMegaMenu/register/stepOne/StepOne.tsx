import { items } from "@/app/utils/data/StepsItems";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Steps } from "primereact/steps";

export default function StepOne({
  setStep,
}: {
  setStep: (step: number) => void;
}) {
  return (
    <div style={{ padding: "30px" }}>
      <Steps model={items} activeIndex={1} />
      <Card
        title="免責事項"
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              padding: "0 20px",
            }}
          >
            <Button type="button" onClick={() => setStep(0)}>
              戻る
            </Button>
            <Button type="button" onClick={() => setStep(2)}>
              登録
            </Button>
          </div>
        }
      >
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit...
        </p>
      </Card>
    </div>
  );
}

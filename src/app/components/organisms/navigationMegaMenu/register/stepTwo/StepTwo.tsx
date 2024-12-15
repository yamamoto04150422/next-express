import { Card } from "primereact/card";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";

export default function StepTwo() {
  const router = useRouter();

  return (
    <div style={{ padding: "30px" }}>
      <Card
        title="登録完了"
        footer={
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="button" onClick={() => router.replace("/")}>
              Homeへ戻る
            </Button>
          </div>
        }
      >
        <p className="m-0">登録が完了しました!</p>
      </Card>
    </div>
  );
}

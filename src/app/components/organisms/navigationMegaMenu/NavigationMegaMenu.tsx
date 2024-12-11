"use client";

import { MegaMenu } from "primereact/megamenu";
import { Avatar } from "primereact/avatar";
import { megaMenuItems } from "@/app/utils/data/MegaMenuItems";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { Badge } from "primereact/badge";

export default function NavigationMegaMenu() {
  const router = useRouter();

  const handleBack = () => {
    router.back(); // 前のページに戻る
  };

  return (
    <MegaMenu
      model={megaMenuItems}
      start={
        <>
          <Button
            type="button"
            onClick={handleBack} // ボタンがクリックされたら戻る
            className="p-button-secondary"
            // raised
          >
            戻る
          </Button>
        </>
      }
      end={
        <div className="card flex flex-wrap justify-content-center gap-4">
          <Avatar image="/next.svg" shape="circle" />
          <i
            className="pi pi-bell p-overlay-badge"
            style={{ fontSize: "2rem" }}
          >
            <Badge value="2"></Badge>
          </i>
          <i
            className="pi pi-calendar p-overlay-badge"
            style={{ fontSize: "2rem" }}
          >
            <Badge value="5+" severity="danger"></Badge>
          </i>
          <i
            className="pi pi-envelope p-overlay-badge"
            style={{ fontSize: "2rem" }}
          >
            <Badge severity="danger"></Badge>
          </i>
        </div>
      }
      breakpoint="960px"
    />
  );
}

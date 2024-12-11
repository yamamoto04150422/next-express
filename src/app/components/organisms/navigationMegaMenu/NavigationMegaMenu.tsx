"use client";

import { MegaMenu } from "primereact/megamenu";
import { Avatar } from "primereact/avatar";
import { megaMenuItems } from "@/app/utils/data/MegaMenuItems";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

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
      end={<Avatar image="/next.svg" shape="circle" />}
      breakpoint="960px"
    />
  );
}

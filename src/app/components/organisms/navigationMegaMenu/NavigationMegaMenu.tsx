"use client";

import { MegaMenu } from "primereact/megamenu";
import { Avatar } from "primereact/avatar";
import { megaMenuItems } from "@/app/utils/data/MegaMenuItems";

export default function NavigationMegaMenu() {
  return (
    <MegaMenu
      model={megaMenuItems}
      start={<Avatar image="/next.svg" shape="circle" />}
      end={<Avatar image="/next.svg" shape="circle" />}
      breakpoint="960px"
    />
  );
}

import { MenuItem } from "primereact/menuitem";

export const megaMenuItems: MenuItem[] = [
  {
    label: "Furniture",
    icon: "pi pi-box",
    items: [
      [
        {
          label: "Living Room",
          items: [
            { label: "Accessories" },
            { label: "Armchair" },
            { label: "Coffee Table" },
            { label: "Couch" },
            { label: "TV Stand" },
          ],
        },
      ],
    ],
  },
];

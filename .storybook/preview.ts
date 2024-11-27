import type { Preview } from "@storybook/react";

import { addLocale, locale } from "primereact/api";
import { LocaleJp } from "../src/app/utils/LocaleJp";

// import "../app/styles/global.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

addLocale("jp", LocaleJp);
locale("jp");

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

"use client";

import "../styles/globals.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import Providers from "./components/provider/Providers";
import NavigationMegaMenu from "./components/organisms/navigationMegaMenu/NavigationMegaMenu";
import { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { setToast } from "./utils/uiService/toastService";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const toast = useRef<Toast>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (toast.current) {
      setToast(toast.current);
    }
  }, []);

  // ページ遷移時にトーストをクリア
  useEffect(() => {
    toast.current?.clear();
  }, [pathname]);

  return (
    <html lang="ja">
      <body>
        <Toast ref={toast} />
        <Providers>
          <NavigationMegaMenu />
          {children}
        </Providers>
      </body>
    </html>
  );
}

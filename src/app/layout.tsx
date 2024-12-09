"use client";

import "../styles/globals.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import Providers from "./components/provider/Providers";
import NavigationMegaMenu from "./components/organisms/navigationMegaMenu/NavigationMegaMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <NavigationMegaMenu />
          {children}
        </Providers>
      </body>
    </html>
  );
}

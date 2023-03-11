import "./globals.css";
import { inter } from "./fonts";
import NavMenu from "@/components/NavMenu/NavMenu";
import styles from "./layout.module.css";

export const metadata = {
  title: "Wirtualny portfel",
  description:
    "Wirtualny portfel spółek akcyjnych notowanych na GPW (Giełda Papierów Wartościowych)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={inter.className}>
      <body className={styles.app}>
        <NavMenu />
        {children}
      </body>
    </html>
  );
}

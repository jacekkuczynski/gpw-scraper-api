import "./globals.css";
import { inter } from "./fonts";
import ReactQueryProvider from "@/components/ReactQueryProvider/ReactQueryProvider";
import WalletApp from "@/components/WalletApp/WalletApp";

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
      <body>
        <ReactQueryProvider>
          <WalletApp>{children}</WalletApp>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

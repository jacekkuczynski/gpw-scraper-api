import "./globals.css";
import { inter } from "./fonts";
import ReactQueryProvider from "@/components/ReactQueryProvider/ReactQueryProvider";
import CompaniesScrollArea from "@/components/CompaniesScrollArea/CompaniesScrollArea";
import NavMenu from "@/components/NavMenu/NavMenu";
import { getAllCompaniesData } from "@/fetchers/getAllCompaniesData";
import DialogCreateWallet from "@/components/DialogCreateWallet/DialogCreateWallet";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Wirtualny portfel",
  description:
    "Wirtualny portfel spółek akcyjnych notowanych na GPW (Giełda Papierów Wartościowych)",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const allCompaniesStartingData = await getAllCompaniesData();

  return (
    <html lang="pl" className={inter.className}>
      <body>
        <ReactQueryProvider>
          <Toaster position="bottom-right" reverseOrder={false} />
          <div className="app">
            <DialogCreateWallet />
            <NavMenu />
            <div className="container">
              <CompaniesScrollArea
                allCompaniesStartingData={allCompaniesStartingData}
              />
              {children}
            </div>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

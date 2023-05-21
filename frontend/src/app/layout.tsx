import "./globals.css";
import { inter } from "./fonts";
import ReactQueryProvider from "@/components/ReactQueryProvider/ReactQueryProvider";
import CompaniesScrollArea from "@/components/CompaniesScrollArea/CompaniesScrollArea";
import NavMenu from "@/components/NavMenu/NavMenu";
import { getAllCompaniesData } from "@/fetchers/getAllCompaniesData";
import DialogCreateWallet from "@/components/DialogCreateWallet/DialogCreateWallet";

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
          <div className="app">
            <DialogCreateWallet
              allCompaniesStartingData={allCompaniesStartingData}
            />
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

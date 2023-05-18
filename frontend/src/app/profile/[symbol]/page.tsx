import ProfileView from "@/components/ProfileView/ProfileView";
import { getAllCompaniesData } from "@/fetchers/getAllCompaniesData";
import styles from "./page.module.css";
import { getCompanyProfile } from "@/fetchers/getCompanyProfile";
import { PriceChart } from "@/components/PriceChart/PriceChart";
import ProfileControlButtons from "@/components/ProfileControlButtons/ProfileControlButtons";
import { Suspense } from "react";

export const dynamicParams = false;

export async function generateStaticParams() {
  const allCompaniesData = await getAllCompaniesData();

  return allCompaniesData.map((company) => {
    const symbol = company.symbol;
    return { symbol };
  });
}

export default async function Home({ params }: { params: { symbol: string } }) {
  const profile = await getCompanyProfile(params.symbol);

  return (
    <div className={styles.profileView}>
      <ProfileView profile={profile} />
      <ProfileControlButtons name={profile.name} symbol={profile.symbol} />
      <PriceChart symbol={profile.symbol} />
    </div>
  );
}

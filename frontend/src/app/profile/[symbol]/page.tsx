import ProfileView from "@/components/ProfileView/ProfileView";
import { getAllCompaniesData } from "@/fetchers/getAllCompaniesData";
import styles from "./page.module.css";
import { getCompanyProfile } from "@/fetchers/getCompanyProfile";
import { PriceChart } from "@/components/PriceChart/PriceChart";
import ProfileControlButtons from "@/components/ProfileControlButtons/ProfileControlButtons";

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
      <PriceChart data={initialData} />
    </div>
  );
}

const initialData = [
  { time: "2018-12-22", value: 32.51 },
  { time: "2018-12-23", value: 31.11 },
  { time: "2018-12-24", value: 27.02 },
  { time: "2018-12-25", value: 27.32 },
  { time: "2018-12-26", value: 25.17 },
  { time: "2018-12-27", value: 28.89 },
  { time: "2018-12-28", value: 25.46 },
  { time: "2018-12-29", value: 23.92 },
  { time: "2018-12-30", value: 22.68 },
  { time: "2018-12-31", value: 22.67 },
];

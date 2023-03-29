import ProfileView from "@/components/ProfileView/ProfileView";
import { getAllCompaniesData } from "@/fetchers/getAllCompaniesData";

export async function generateStaticParams() {
  const allCompaniesData = await getAllCompaniesData();

  return allCompaniesData.map((company) => {
    const symbol = company.symbol;
    return { symbol };
  });
}

export default function Home({ params }: { params: { symbol: string } }) {
  return <ProfileView symbol={params.symbol} />;
}

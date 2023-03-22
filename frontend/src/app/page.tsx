import CompaniesScrollArea from "@/components/CompaniesScrollArea/CompaniesScrollArea";
import { getAllCompaniesData } from "@/fetchers/getAllCompaniesData";
import styles from "./page.module.css";

export default async function Home() {
  const allCompaniesData = await getAllCompaniesData();

  return (
    <div className={styles.app}>
      <CompaniesScrollArea allCompaniesData={allCompaniesData} />
    </div>
  );
}

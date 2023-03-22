// import AllCompaniesData from "@/components/AllCompaniesData/AllCompaniesData";
import CompaniesScrollArea from "@/components/CompaniesScrollArea/CompaniesScrollArea";
import CompanyPopover from "@/components/CompanyPopover/CompanyPopover";
import ContextMenuApp from "@/components/ContextMenuApp/ContextMenuApp";
import { SingleCompanyStartingData } from "@/types/types";
import axios from "axios";
import styles from "./page.module.css";

const localHost = "http://localhost:3001/data";

async function getAllCompaniesData() {
  const data: SingleCompanyStartingData[] = await axios
    .get(localHost)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
}

export default async function Home() {
  const allCompaniesData = await getAllCompaniesData();

  return (
    <div className={styles.app}>
      <CompaniesScrollArea allCompaniesData={allCompaniesData} />
      <ContextMenuApp />
    </div>
  );
}

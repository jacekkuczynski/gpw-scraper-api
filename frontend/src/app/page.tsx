// import AllCompaniesData from "@/components/AllCompaniesData/AllCompaniesData";
import CompaniesScrollArea from "@/components/CompaniesScrollArea/CompaniesScrollArea";
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
    <div className={styles.container}>
      <aside className={styles.scrollArea}>
        <CompaniesScrollArea allCompaniesData={allCompaniesData} />
      </aside>
      <div>
        <h1>Wirtualny portfel</h1>
        <h2>
          Wirtualny portfel spółek akcyjnych notowanych na Giełdzie Papierów
          Wartościowych (GPW)
        </h2>
      </div>
    </div>
  );
}

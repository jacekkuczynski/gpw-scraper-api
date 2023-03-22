import { SingleCompanyStartingData } from "@/types/types";
import axios from "axios";

export const getAllCompaniesData = async () => {
  const serverAdress = process.env.NEXT_PUBLIC_SERVER_ADRESS;
  const data: SingleCompanyStartingData[] = await axios
    .get(`${serverAdress}/data`)
    .then((response) => {
      response.data.forEach(
        (company: SingleCompanyStartingData, index: number) => {
          company.companyIndex = index + 1;
        }
      );
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
};

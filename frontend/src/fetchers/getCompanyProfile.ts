import { CompanyProfileI } from "@/types/types";
import axios from "axios";

export const getCompanyProfile = async (symbol: string) => {
  const serverAdress = process.env.NEXT_PUBLIC_SERVER_ADRESS;
  const url = `${serverAdress}/profile?symbol=${symbol}`;
  const data: CompanyProfileI = await axios.get(url).then((res) => {
    return res.data;
  });

  return data;
};

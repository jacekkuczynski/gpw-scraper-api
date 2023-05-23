import { useQuery } from "react-query";
import { getCurrentCompanyPrice } from "@/fetchers/getCurrentCompanyPrice";

export const useGetCurrentCompanyPrice = (symbol: string) => {
  const { data } = useQuery(["companyPrice", symbol], getCurrentCompanyPrice);

  return data ? data : 0;
};

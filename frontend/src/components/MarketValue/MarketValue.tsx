"use client";

import { getCurrentCompanyPrice } from "@/fetchers/getCurrentCompanyPrice";
import { useQuery } from "react-query";

const MarketValue = ({ numberOfStocks, symbol }: any) => {
  const { data } = useQuery(["companyPrice", symbol], getCurrentCompanyPrice);

  return (
    <>
      {data
        ? `wartość rynkowa: ${new Intl.NumberFormat("pl-PL", {
            style: "currency",
            currency: "PLN",
          }).format(data * numberOfStocks)}`
        : "wartość rynkowa: ładowanie"}
    </>
  );
};

export default MarketValue;

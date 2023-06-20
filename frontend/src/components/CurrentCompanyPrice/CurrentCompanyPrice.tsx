"use client";

import { getCurrentCompanyPrice } from "@/fetchers/getCurrentCompanyPrice";
import { parsePriceToLocaleString } from "@/helpers";
import { useQuery } from "react-query";

const CurrentCompanyPrice = ({ symbol }: { symbol: string }) => {
  const { data } = useQuery(["companyPrice", symbol], getCurrentCompanyPrice);

  return (
    <>
      {data ? (
        <>
          <span>{parsePriceToLocaleString(data)}</span>
        </>
      ) : (
        <>wczytywanie ceny</>
      )}
    </>
  );
};

export default CurrentCompanyPrice;

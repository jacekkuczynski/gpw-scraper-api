"use client";

import { getCurrentCompanyPrice } from "@/fetchers/getCurrentCompanyPrice";
import { useQuery } from "react-query";
import styles from "./CurrentCompanyPrice.module.css";

const CurrentCompanyPrice = ({ symbol }: { symbol: string }) => {
  const { data } = useQuery(["companyPrice", symbol], getCurrentCompanyPrice);

  return (
    <div className={styles.currentCompanyPriceContainer}>
      {data ? (
        <div className={styles.priceContainer}>
          <span>
            {data.toLocaleString("pl-PL", {
              style: "currency",
              currency: "PLN",
            })}
          </span>{" "}
          - aktualna cena za akcje
        </div>
      ) : (
        <div>wczytywanie ceny</div>
      )}
    </div>
  );
};

export default CurrentCompanyPrice;

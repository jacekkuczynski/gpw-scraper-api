"use client";

import Link from "next/link";
import { monofett, spaceMono } from "@/app/fonts";
import styles from "./Watchlistcard.module.css";
import { useAppStore } from "@/store/store";
import { getCurrentCompanyPrice } from "@/fetchers/getCurrentCompanyPrice";
import { useQuery } from "react-query";

const Watchlistcard = ({ name, symbol }: { name: string; symbol: string }) => {
  const removeFromWatchlist = useAppStore((state) => state.removeFromWatchlist);
  const { data } = useQuery(["companyPrice", symbol], getCurrentCompanyPrice);

  const handleRemoveFromWatchlist = (symbol: string) => {
    removeFromWatchlist(symbol);
  };
  return (
    <div className={styles.watchlistCard}>
      <div className={styles.symbol}>
        <div className={monofett.className}> {symbol}</div>
        <span>1 akcja</span>
      </div>

      <div className={styles.name}>{name}</div>
      <div className={styles.priceCss}>
        <div className={spaceMono.className}>
          {data?.toFixed(2).padStart(8, "0")}
          {!data && "00000.00"}
        </div>
      </div>

      <Link href={`/profile/${symbol}`} className={styles.link}>
        <div>profil spółki</div>
      </Link>
      <button
        onClick={() => {
          handleRemoveFromWatchlist(symbol);
        }}
        className={styles.removeButton}
      >
        usuń
      </button>
    </div>
  );
};

export default Watchlistcard;

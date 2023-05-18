"use client";

import Link from "next/link";
import styles from "./Watchlistcard.module.css";
import { useAppStore } from "@/store/store";

const Watchlistcard = ({ name, symbol }: { name: string; symbol: string }) => {
  const removeFromWatchlist = useAppStore((state) => state.removeFromWatchlist);
  const handleRemoveFromWatchlist = (symbol: string) => {
    removeFromWatchlist(symbol);
  };
  return (
    <div className={styles.watchlistCard}>
      <div className={styles.avatar}> {symbol}</div>
      <Link href={`/profile/${symbol}`} className={styles.link}>
        <div>zobacz profil</div>
      </Link>
      {name}
      <button
        onClick={() => {
          handleRemoveFromWatchlist(symbol);
        }}
      >
        Usuń z listy
      </button>
    </div>
  );
};

export default Watchlistcard;

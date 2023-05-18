"use client";

import { useAppStore } from "@/store/store";
import React from "react";
import Watchlistcard from "../Watchlistcard/Watchlistcard";
import styles from "./WatchlistView.module.css";

const WatchlistView = () => {
  const watchlist = useAppStore((state) => state.watchlist);

  return (
    <div className={styles.watchlist}>
      {watchlist
        ? watchlist.map((company) => {
            return (
              <Watchlistcard
                key={company.symbol}
                name={company.name}
                symbol={company.symbol}
              />
            );
          })
        : "loading"}
    </div>
  );
};

export default WatchlistView;

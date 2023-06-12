"use client";

import { useAppStore } from "@/store/store";
import React from "react";
import Watchlistcard from "../Watchlistcard/Watchlistcard";
import styles from "./WatchlistView.module.css";

const WatchlistView = () => {
  const watchlist = useAppStore((state) => state.watchlist);

  return (
    <div className={styles.watchlist}>
      {watchlist.length < 1 && (
        <div>
          <b>no items on watchlist yet</b>
          <br />
          search some companies on the left, go to the company profile view and
          add any company to the watchlist to display
        </div>
      )}
      {watchlist.map((company) => {
        return (
          <Watchlistcard
            key={company.symbol}
            name={company.name}
            symbol={company.symbol}
          />
        );
      })}
    </div>
  );
};

export default WatchlistView;

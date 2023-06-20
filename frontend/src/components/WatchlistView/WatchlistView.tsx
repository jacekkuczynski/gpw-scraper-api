"use client";

import React from "react";
import Watchlistcard from "../Watchlistcard/Watchlistcard";
import styles from "./WatchlistView.module.css";
import { useAppStore } from "@/store/store";

const WatchlistView = () => {
  const watchlist = useAppStore((state) => state.watchlist);

  return (
    <div className={styles.watchlist}>
      {watchlist.length < 1 && (
        <div>
          <b>no items on watchlist yet</b>
          <br />
          Choose a company on the left, go to the company profile view and add
          one of them to the watchlist to display
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

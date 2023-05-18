"use client";

import { useAppStore } from "@/store/store";
import React from "react";
import Watchlistcard from "../Watchlistcard/Watchlistcard";

const WatchlistView = () => {
  const watchlist = useAppStore((state) => state.watchlist);

  return (
    <div>
      {watchlist
        ? watchlist.map((company) => {
            return (
              <div key={company.symbol}>
                <Watchlistcard name={company.name} symbol={company.symbol} />
              </div>
            );
          })
        : "loading"}
    </div>
  );
};

export default WatchlistView;

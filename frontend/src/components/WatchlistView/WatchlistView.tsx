"use client";

import { useAppStore } from "@/store/store";
import Link from "next/link";
import { useState } from "react";
import styles from "./WatchlistView.module.css";
import React from "react";

const WatchlistView = () => {
  const [symbolToRemove, setSymbolToRemove] = useState("");
  const watchlist = useAppStore((state) => state.watchlist);
  const removeFromWatchlist = useAppStore((state) => state.removeFromWatchlist);

  const handleRemoveFromWatchlist = (symbol: string) => {
    console.log("clicked");
    removeFromWatchlist(symbol);
  };

  return (
    <div>
      {watchlist.map((company) => {
        return (
          <div key={company.symbol}>
            <Link href={`/profile/${company.symbol}`}>
              <div>
                {company.name} {company.symbol}
              </div>
            </Link>
            <button
              onClick={() => {
                handleRemoveFromWatchlist(company.symbol);
              }}
            >
              Usuń z listy
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default WatchlistView;

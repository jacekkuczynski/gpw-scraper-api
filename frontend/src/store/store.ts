import { create } from "zustand";
import { persist } from "zustand/middleware";

type WatchlistItemType = {
  name: string;
  symbol: string;
};

interface StateI {
  watchlist: WatchlistItemType[];
  addToWatchlist: (company: WatchlistItemType) => void;
  removeFromWatchlist: (symbol: string) => void;
}

export const useAppStore = create<StateI>()(
  persist(
    (set) => ({
      watchlist: [],
      addToWatchlist: (company) =>
        set((state) => ({ watchlist: [...state.watchlist, company] })),
      removeFromWatchlist: (symbol) =>
        set((state) => ({
          watchlist: state.watchlist.filter((el) => el.symbol !== symbol),
        })),
    }),
    {
      name: "watchlist",
      skipHydration: true,
    }
  )
);

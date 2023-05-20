import { create } from "zustand";
import { persist } from "zustand/middleware";

type WatchlistItemT = {
  name: string;
  symbol: string;
};

type WalletT = {
  size: number;
  name: string;
  id: number;
  items: WalletItemT[];
};

type WalletItemT = {
  name: string;
  symbol: string;
  openPrice: number;
  count: number;
  openDate: Date;
  averageOpenPrice: number;
};

interface StateI {
  isDialogOpen: boolean;
  changeDialogVisibility: (isDialogOpen: boolean) => void;
  wallets: WalletT[];
  createWallet: (wallet: WalletT) => void;
  modifyWallet: () => void;
  addWalletItem: () => void;
  modifyWalletItem: () => void;

  watchlist: WatchlistItemT[];
  addToWatchlist: (company: WatchlistItemT) => void;
  removeFromWatchlist: (symbol: string) => void;
}

export const useAppStore = create<StateI>()(
  persist(
    (set) => ({
      isDialogOpen: false,
      changeDialogVisibility: (boolean) =>
        set((state) => ({ isDialogOpen: boolean })),
      // wallets
      wallets: [],
      createWallet: (newWallet) =>
        set((state) => ({ wallets: [...state.wallets, newWallet] })),
      modifyWallet: () => set((state) => ({})),
      addWalletItem: () => set((state) => ({})),
      modifyWalletItem: () => set((state) => ({})),

      // watchlist
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

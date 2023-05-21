import { create } from "zustand";
import { persist } from "zustand/middleware";

type WatchlistItemT = {
  name: string;
  symbol: string;
};

type WalletT = {
  name: string;
  items: WalletItemT[];
  createdAt: Date;
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
  isCreateWalletDialogOpen: boolean;
  dialogCompanySymbol: string;
  setDialogCompanySymbol: (symbol: string) => void;
  changeCreateWalletDialogVisibility: (isDialogOpen: boolean) => void;
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
      isCreateWalletDialogOpen: false,
      dialogCompanySymbol: "",
      setDialogCompanySymbol: (symbol) =>
        set(() => ({ dialogCompanySymbol: symbol })),
      changeCreateWalletDialogVisibility: (boolean) =>
        set((state) => ({ isCreateWalletDialogOpen: boolean })),
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

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

export type WalletItemT = {
  walletName: string;
  stockName: string;
  symbol: string;
  openPrice: number;
  stockCount: number;
  openDate: Date;
};

interface StateI {
  isCreateWalletDialogOpen: boolean;
  changeCreateWalletDialogVisibility: (isDialogOpen: boolean) => void;
  isAddToWalletDialogOpen: boolean;
  changeAddToWalletDialogVisibility: (isDialogOpen: boolean) => void;
  wallets: WalletT[];
  createWallet: (wallet: WalletT) => void;
  modifyWallet: () => void;
  addWalletItem: (walletItem: WalletItemT) => void;
  modifyWalletItem: () => void;

  watchlist: WatchlistItemT[];
  addToWatchlist: (company: WatchlistItemT) => void;
  removeFromWatchlist: (symbol: string) => void;
}

export const useAppStore = create<StateI>()(
  persist(
    (set) => ({
      isCreateWalletDialogOpen: false,
      changeCreateWalletDialogVisibility: (boolean) =>
        set((state) => ({ isCreateWalletDialogOpen: boolean })),
      isAddToWalletDialogOpen: false,
      changeAddToWalletDialogVisibility: (boolean) =>
        set((state) => ({ isAddToWalletDialogOpen: boolean })),
      // wallets
      wallets: [],
      createWallet: (newWallet) =>
        set((state) => ({ wallets: [...state.wallets, newWallet] })),
      modifyWallet: () => set((state) => ({})),
      addWalletItem: (walletItem) =>
        set((state) => {
          const walletToModify = state.wallets.find(
            (wallet) => wallet.name === walletItem.walletName
          );
          walletToModify?.items.push(walletItem);
          return {
            wallets: [...state.wallets],
          };
        }),
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

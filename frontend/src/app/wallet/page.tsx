"use client";

import WalletCard from "@/components/WalletCard/WalletCard";
import styles from "./page.module.css";
import { useAppStore } from "@/store/store";

export default function Home() {
  const wallets = useAppStore((state) => state.wallets);
  const changeCreateWalletDialogVisibility = useAppStore(
    (state) => state.changeCreateWalletDialogVisibility
  );

  return (
    <div className={styles.walletCss}>
      {wallets.length < 1 && (
        <div>
          <div className={styles.noWallet}>
            no wallets
            <br />
            click here to create new wallet
            <br />
          </div>
          <button
            onClick={() => {
              changeCreateWalletDialogVisibility(true);
            }}
            className="button"
          >
            Create new wallet
          </button>
        </div>
      )}
      {wallets.map((wallet) => {
        return (
          <WalletCard
            key={wallet.name + wallet.createdAt}
            name={wallet.name}
            items={wallet.items}
            createdAt={wallet.createdAt}
          />
        );
      })}
    </div>
  );
}

"use client";

import WalletCard from "@/components/WalletCard/WalletCard";
import { useAppStore } from "@/store/store";
import styles from "./page.module.css";

export default function Home() {
  const wallets = useAppStore((state) => state.wallets);

  return (
    <div className={styles.walletCss}>
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

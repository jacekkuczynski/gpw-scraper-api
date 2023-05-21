"use client";

import WalletCard from "@/components/WalletCard/WalletCard";
import { useAppStore } from "@/store/store";

export default function Home() {
  const wallets = useAppStore((state) => state.wallets);

  return (
    <div>
      {wallets.map((wallet) => {
        return (
          <WalletCard
            key={wallet.name + wallet.createdAt}
            name={wallet.name}
            items={wallet.items}
            createdAt={wallet.createdAt}
          />
          // <p key={wallet.name + wallet.createdAt}>
          //   {wallet.name} {new Date(wallet.createdAt).toLocaleDateString()}/
          //   {new Date(wallet.createdAt).toLocaleTimeString()}
          // </p>
        );
      })}
    </div>
  );
}

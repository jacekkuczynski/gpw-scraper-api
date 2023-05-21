"use client";

import { useAppStore } from "@/store/store";

export default function Home() {
  const wallets = useAppStore((state) => state.wallets);

  return (
    <div>
      {wallets.map((wallet, index) => {
        return (
          <p key={index}>
            {wallet.name} {new Date(wallet.createdAt).toLocaleDateString()}/
            {new Date(wallet.createdAt).toLocaleTimeString()}
          </p>
        );
      })}
    </div>
  );
}

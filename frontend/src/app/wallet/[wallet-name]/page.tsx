"use client";

import { useAppStore } from "@/store/store";

export default function Home() {
  const wallets = useAppStore((state) => state.watchlist);

  return (
    <>
      {wallets.length === 0 && <div>no wallets</div>}
      {wallets.length > 0 && (
        <div>
          {wallets.map((el) => (
            <h1 key={el.name}>{el.name}</h1>
          ))}
        </div>
      )}
    </>
  );
}

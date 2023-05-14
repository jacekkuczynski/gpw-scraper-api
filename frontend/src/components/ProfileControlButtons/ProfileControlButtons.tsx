"use client";

import { useAppStore } from "@/store/store";
import styles from "./ProfileControlButtons.module.css";

const ProfileControlButtons = ({
  name,
  symbol,
}: {
  name: string;
  symbol: string;
}) => {
  const addToWatchlist = useAppStore((state) => state.addToWatchlist);
  const watchlist = useAppStore((state) => state.watchlist);

  const handleAddToWatchlist = (e: React.MouseEvent<HTMLElement>) => {
    console.log("clicked");
    e.preventDefault();
    addToWatchlist({ name, symbol });
  };

  return (
    <div className={styles.profileButtons}>
      <button
        onClick={handleAddToWatchlist}
        type="button"
        className={styles.button}
      >
        Dodaj do obserwowanych
      </button>
      <button type="button" className={styles.button}>
        Dodaj do portfela
      </button>
    </div>
  );
};

export default ProfileControlButtons;

"use client";

import { CompanyProfileI } from "@/types/types";
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

  const handleAddToWatchlist = (e: React.MouseEvent<HTMLElement>) => {
    console.log("clicked");
    e.preventDefault();
    addToWatchlist({ name, symbol });
  };

  return (
    <div className={styles.controlButtons}>
      <button
        onClick={handleAddToWatchlist}
        type="button"
        className={styles.btn}
      >
        Dodaj do obserwowanych
      </button>
      <button type="button" className={styles.btn}>
        Dodaj do portfela
      </button>
    </div>
  );
};

export default ProfileControlButtons;

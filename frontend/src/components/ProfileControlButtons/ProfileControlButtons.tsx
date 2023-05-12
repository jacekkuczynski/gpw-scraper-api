"use client";

import { useAppStore } from "@/store/store";
import styles from "./ProfileControlButtons.module.css";
import * as Toggle from "@radix-ui/react-toggle";
import { FontItalicIcon } from "@radix-ui/react-icons";

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
    <div className={styles.controlButtons}>
      <Toggle.Root className={styles.Toggle} aria-label="Toggle italic">
        <button
          onClick={handleAddToWatchlist}
          type="button"
          className={styles.btn}
        >
          Dodaj do obserwowanych
        </button>
        <FontItalicIcon />
      </Toggle.Root>

      <button type="button" className={styles.btn}>
        Dodaj do portfela
      </button>
    </div>
  );
};

export default ProfileControlButtons;

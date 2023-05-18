"use client";

import { useAppStore } from "@/store/store";
import styles from "./ProfileControlButtons.module.css";
import toast, { Toaster } from "react-hot-toast";

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
    e.preventDefault();

    if (watchlist.find((company) => symbol === company.symbol)) {
      toast(
        `${name} (${symbol}) obecnie znajduje się na liście obserwowanych`,
        {
          duration: 3000,
          id: "watchlist_succes",
          icon: "📋",
        }
      );
    } else {
      toast.success(
        `${name} (${symbol}) została dodana do listy obserwowanych`,
        {
          duration: 3000,
          id: "watchlist_error",
        }
      );
      addToWatchlist({ name, symbol });
    }
  };

  return (
    <div className={styles.profileButtons}>
      <Toaster position="bottom-right" reverseOrder={false} />
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

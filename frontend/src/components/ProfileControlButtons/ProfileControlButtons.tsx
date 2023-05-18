"use client";

import styles from "./ProfileControlButtons.module.css";
import { Toaster } from "react-hot-toast";
import { useProfileControlButtons } from "./useProfileControlButtons";

const ProfileControlButtons = ({
  name,
  symbol,
}: {
  name: string;
  symbol: string;
}) => {
  const { isInWatchlist, handleRemoveFromWatchlist, handleAddToWatchlist } =
    useProfileControlButtons({ name, symbol });

  return (
    <div className={styles.profileButtons}>
      <Toaster position="bottom-right" reverseOrder={false} />
      <button type="button" className={styles.button}>
        Dodaj do portfela
      </button>
      {isInWatchlist ? (
        <>
          <button
            onClick={handleRemoveFromWatchlist}
            type="button"
            className={styles.button}
          >
            Usuń z obserwowanych
          </button>
          ⭐
        </>
      ) : (
        <button
          onClick={handleAddToWatchlist}
          type="button"
          className={styles.button}
        >
          Dodaj do obserwowanych
        </button>
      )}
    </div>
  );
};

export default ProfileControlButtons;

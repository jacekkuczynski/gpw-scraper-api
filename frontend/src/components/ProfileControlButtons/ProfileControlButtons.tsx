"use client";

import styles from "./ProfileControlButtons.module.css";
import { Toaster } from "react-hot-toast";
import { useProfileControlButtons } from "./useProfileControlButtons";
import Link from "next/link";
import { useAppStore } from "@/store/store";

const ProfileControlButtons = ({
  name,
  symbol,
}: {
  name: string;
  symbol: string;
}) => {
  const changeDialogVisibility = useAppStore(
    (state) => state.changeDialogVisibility
  );

  const isDialogOpen = useAppStore((state) => state.isDialogOpen);

  const { isInWatchlist, handleRemoveFromWatchlist, handleAddToWatchlist } =
    useProfileControlButtons({ name, symbol });

  return (
    <div className={styles.profileButtons}>
      <Toaster position="bottom-right" reverseOrder={false} />
      <button
        onClick={() => {
          changeDialogVisibility(true);
          console.log("clicked");
        }}
        type="button"
        className={styles.button}
      >
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
      <Link href={"/watchlist"}>
        <button type="button" className={styles.button}>
          Przejdź do obserwowanych
        </button>
      </Link>
    </div>
  );
};

export default ProfileControlButtons;

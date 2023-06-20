"use client";

import styles from "./ProfileControlButtons.module.css";
import { useProfileControlButtons } from "./useProfileControlButtons";
import Link from "next/link";
import { useAppStore } from "@/store/store";
import DialogAddToWallet from "../DialogAddToWallet/DialogAddToWallet";

const ProfileControlButtons = ({
  name,
  symbol,
}: {
  name: string;
  symbol: string;
}) => {
  const changeAddToWalletDialogVisibility = useAppStore(
    (state) => state.changeAddToWalletDialogVisibility
  );

  const isAddToWalletDialogOpen = useAppStore(
    (state) => state.isAddToWalletDialogOpen
  );

  const { isInWatchlist, handleRemoveFromWatchlist, handleAddToWatchlist } =
    useProfileControlButtons({ name, symbol });

  return (
    <>
      <DialogAddToWallet symbol={symbol} name={name} />
      <div className={styles.profileButtons}>
        <button
          onClick={() => {
            changeAddToWalletDialogVisibility(true);
          }}
          type="button"
          className="button"
        >
          Dodaj do portfela
        </button>
        {isInWatchlist ? (
          <>
            <button
              onClick={handleRemoveFromWatchlist}
              type="button"
              className="button"
            >
              Usuń z obserwowanych
            </button>
          </>
        ) : (
          <button
            onClick={handleAddToWatchlist}
            type="button"
            className="button"
          >
            Dodaj do obserwowanych
          </button>
        )}
        <Link href={"/watchlist"}>
          <button type="button" className="button">
            Przejdź do obserwowanych
          </button>
        </Link>
      </div>
    </>
  );
};

export default ProfileControlButtons;

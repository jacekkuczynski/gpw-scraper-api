"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./DialogAddToWallet.module.css";
import SelectWallet from "../SelectWallet/SelectWallet";
import { useDialogAddToWallet } from "./useDialogAddToWallet";

const DialogAddToWallet = ({
  symbol,
  name,
}: {
  symbol: string;
  name: string;
}) => {
  const {
    isAddToWalletDialogOpen,
    changeAddToWalletDialogVisibility,
    data,
    handleWalletNameChange,
    walletName,
    handleStockCountInputChange,
    stockCount,
    handleAddWalletItem,
  } = useDialogAddToWallet({ name, symbol });

  return (
    <>
      <Dialog.Root
        open={isAddToWalletDialogOpen}
        onOpenChange={() => {
          changeAddToWalletDialogVisibility(!isAddToWalletDialogOpen);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className={styles.DialogOverlay} />
          <Dialog.Content className={styles.DialogContent}>
            <Dialog.Title className={styles.DialogTitle}>
              Dodaj do istniejącego
            </Dialog.Title>
            <Dialog.Description className={styles.DialogDescription}>
              Dodaj spółkę do istniejącego portfela
            </Dialog.Description>

            {data && (
              <form className={styles.walletForm}>
                <fieldset className={styles.Fieldset}>
                  <label className={styles.Label}>Wybierz portfel</label>
                  <SelectWallet onNameChange={handleWalletNameChange} />
                </fieldset>
                <fieldset className={styles.Fieldset}>
                  <label className={styles.Label} htmlFor="count">
                    Ile akcji chcesz dodać do portfela?
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    className={styles.Input}
                    id="count"
                    defaultValue={walletName}
                    onChange={handleStockCountInputChange}
                  />
                </fieldset>
                <div className={styles.container}>
                  suma: {data && (stockCount * data).toFixed(2)} PLN
                </div>
                <div className={styles.container}>
                  <button
                    onClick={handleAddWalletItem}
                    type="button"
                    className="button"
                  >
                    Dodaj do portfela
                  </button>
                </div>
              </form>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default DialogAddToWallet;

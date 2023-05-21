"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./DialogCreateWallet.module.css";
import { useDialogCreateWallet } from "./useDialogCreateWallet";

const DialogCreateWallet = () => {
  const {
    isDialogOpen,
    changeCreateWalletDialogVisibility,
    walletName,
    handleWalletNameInputChange,
    handleCreateWallet,
  } = useDialogCreateWallet();
  return (
    <>
      <Dialog.Root
        open={isDialogOpen}
        onOpenChange={() => {
          changeCreateWalletDialogVisibility(!isDialogOpen);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className={styles.DialogOverlay} />
          <Dialog.Content className={styles.DialogContent}>
            <Dialog.Title className={styles.DialogTitle}>
              Nowy portfel
            </Dialog.Title>
            <Dialog.Description className={styles.DialogDescription}>
              Utwórz nowy portfel
            </Dialog.Description>

            <form className={styles.walletForm}>
              <fieldset className={styles.Fieldset}>
                <label className={styles.Label} htmlFor="walletName">
                  Nazwij nowy portfel
                </label>
                <input
                  type="text"
                  className={styles.Input}
                  id="walletName"
                  defaultValue={walletName}
                  onChange={handleWalletNameInputChange}
                />
              </fieldset>

              <div className={styles.container}>
                <button
                  onClick={handleCreateWallet}
                  type="button"
                  className="button"
                >
                  Utwórz nowy portfel
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default DialogCreateWallet;

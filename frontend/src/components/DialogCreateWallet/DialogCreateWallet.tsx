"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./DialogCreateWallet.module.css";
import { useAppStore } from "@/store/store";
import SelectWallet from "../SelectWallet/SelectWallet";

const DialogCreateWallet = () => {
  const isDialogOpen = useAppStore((state) => state.isDialogOpen);
  const changeDialogVisibility = useAppStore(
    (state) => state.changeDialogVisibility
  );
  const createWallet = useAppStore((state) => state.createWallet);

  const handleCreateWallet = () => {
    createWallet({ size: 0, name: "", id: 1, items: [] });
  };

  return (
    <Dialog.Root
      open={isDialogOpen}
      onOpenChange={() => {
        changeDialogVisibility(!isDialogOpen);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>
            Utwórz nowy portfel / dodaj do istniejącego
          </Dialog.Title>
          <Dialog.Description className={styles.DialogDescription}>
            Make changes to your profile here. Click save when youre done.
          </Dialog.Description>
          <div>
            <label htmlFor="checkbox" />
            <input type="checkbox" id="checkbox" />
          </div>

          <fieldset className={styles.Fieldset}>
            <label className={styles.Label} htmlFor="name">
              Name
            </label>
            <input
              className={styles.Input}
              id="name"
              defaultValue="Pedro Duarte"
            />
          </fieldset>
          <fieldset className={styles.Fieldset}>
            <label className={styles.Label} htmlFor="username">
              Username
            </label>
            <input
              className={styles.Input}
              id="username"
              defaultValue="@peduarte"
            />
          </fieldset>
          <div className={styles.DialogTitle}> lub dodaj do istniejącego</div>
          <SelectWallet />

          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button onClick={handleCreateWallet} className={styles.Button}>
                Save changes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className={styles.IconButton} aria-label="Close">
              X
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogCreateWallet;

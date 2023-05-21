"use client";

import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Switch from "@radix-ui/react-switch";
import styles from "./DialogAddToWallet.module.css";
import { useAppStore } from "@/store/store";
import SelectWallet from "../SelectWallet/SelectWallet";
import { Toaster } from "react-hot-toast";
import { SingleCompanyStartingData } from "@/types/types";

const DialogAddToWallet = ({
  allCompaniesStartingData,
}: {
  allCompaniesStartingData: SingleCompanyStartingData[];
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [walletName, setWalletName] = useState(self.crypto.randomUUID());
  const [stockCount, setStockCount] = useState(0);

  const isDialogOpen = useAppStore((state) => state.isDialogOpen);
  const changeDialogVisibility = useAppStore(
    (state) => state.changeDialogVisibility
  );
  const createWallet = useAppStore((state) => state.createWallet);

  useEffect(() => {}, []);

  const handleCreateWallet = () => {
    createWallet({
      name: walletName,
      items: [],
      createdAt: new Date(),
    });
    changeDialogVisibility(false);
    setWalletName(self.crypto.randomUUID());
    setIsChecked(false);
  };

  const handleCheckChange = () => {
    setIsChecked(!isChecked);
  };

  const handleWalletNameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWalletName(e.target.value);
  };

  const handleStockCountInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStockCount(parseInt(e.target.value));
  };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />{" "}
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
              Nowy portfel / dodaj do istniejącego{" "}
            </Dialog.Title>
            <Dialog.Description className={styles.DialogDescription}>
              Utwórz nowy portfel lub dodaj spółkę do istniejącego
            </Dialog.Description>
            {/* toggle switch */}
            <div className={styles.switchContainer}>
              <label className={styles.Label} htmlFor="new-wallet">
                Nowy potfel
              </label>
              <Switch.Root
                checked={isChecked}
                onCheckedChange={handleCheckChange}
                className={styles.SwitchRoot}
                id="new-wallet"
              >
                <Switch.Thumb className={styles.SwitchThumb} />
              </Switch.Root>
            </div>

            <form className={styles.walletForm}>
              <fieldset className={styles.Fieldset} disabled={!isChecked}>
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
                  disabled={!isChecked}
                  type="button"
                  className="button"
                >
                  Utwórz nowy portfel
                </button>
              </div>
            </form>

            <div className={styles.DialogTitle}>dodaj do istniejącego</div>

            <form className={styles.walletForm}>
              <fieldset className={styles.Fieldset} disabled={isChecked}>
                <label className={styles.Label}>Wybierz spółkę</label>
                <SelectWallet
                  allCompaniesStartingData={allCompaniesStartingData}
                />
              </fieldset>
              <fieldset className={styles.Fieldset} disabled={isChecked}>
                <label className={styles.Label} htmlFor="count">
                  Ile akcji chcesz dodać do portfela?
                </label>
                <input
                  type="number"
                  className={styles.Input}
                  id="count"
                  defaultValue={walletName}
                  onChange={handleStockCountInputChange}
                />
              </fieldset>
              <div className={styles.container}>suma: {}</div>
              <div className={styles.container}>
                <button
                  // onClick={}
                  disabled={isChecked}
                  type="button"
                  className="button"
                >
                  Dodaj do portfela
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default DialogAddToWallet;

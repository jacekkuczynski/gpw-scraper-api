"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./DialogAddToWallet.module.css";
import { useAppStore } from "@/store/store";

import SelectWallet from "../SelectWallet/SelectWallet";
import { useQuery } from "react-query";
import { getCurrentCompanyPrice } from "@/fetchers/getCurrentCompanyPrice";
import toast from "react-hot-toast";

const DialogAddToWallet = ({
  symbol,
  name,
}: {
  symbol: string;
  name: string;
}) => {
  const [walletName, setWalletName] = useState(self.crypto.randomUUID());
  const [stockCount, setStockCount] = useState(0);

  const { data } = useQuery(["companyPrice", symbol], getCurrentCompanyPrice);

  const isAddToWalletDialogOpen = useAppStore(
    (state) => state.isAddToWalletDialogOpen
  );
  const changeAddToWalletDialogVisibility = useAppStore(
    (state) => state.changeAddToWalletDialogVisibility
  );

  const addWalletItem = useAppStore((state) => state.addWalletItem);

  const handleWalletNameChange = (name: string) => {
    setWalletName(name);
  };

  const handleStockCountInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStockCount(parseInt(e.target.value));
  };

  const handleAddWalletItem = () => {
    if (data) {
      addWalletItem({
        stockCount,
        walletName,
        stockName: name,
        openDate: new Date(),
        openPrice: data,
        symbol,
      });
      toast.success(
        `Do portfela o nazwie ${walletName} dodano ${stockCount} akcji ${name} (${symbol})  po cenie ${data} za sztukę. Łączna wartość transakcji: ${
          stockCount * data
        }`,
        {
          duration: 3000,
          id: "watchlist_error",
        }
      );
      changeAddToWalletDialogVisibility(false);
    }
  };

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

            <div className={styles.DialogTitle}>dodaj do istniejącego</div>

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
                  suma: {data && stockCount * data} PLN
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

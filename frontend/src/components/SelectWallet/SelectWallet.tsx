"use client";

import React, { ReactNode } from "react";
import * as Select from "@radix-ui/react-select";
import styles from "./SelectWallet.module.css";
import classnames from "classnames";

import { useAppStore } from "@/store/store";

const SelectWallet = ({ onNameChange }: { onNameChange: Function }) => {
  const wallets = useAppStore((state) => state.wallets);
  const changeCreateWalletDialogVisibility = useAppStore(
    (state) => state.changeCreateWalletDialogVisibility
  );

  return (
    <div className={styles.selectWallet}>
      {wallets.length === 0 ? (
        <>
          brak{" "}
          <button
            className="button"
            onClick={(e) => {
              e.preventDefault();
              changeCreateWalletDialogVisibility(true);
            }}
          >
            Utwórz nowy portfel
          </button>
        </>
      ) : (
        <Select.Root
          onValueChange={(value) => {
            onNameChange(value);
          }}
        >
          <Select.Trigger className={styles.SelectTrigger} aria-label="Food">
            <Select.Value placeholder="wybierz portfel" />
            <Select.Icon className={styles.SelectIcon}></Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className={styles.SelectContent}>
              <Select.ScrollUpButton
                className={styles.SelectScrollButton}
              ></Select.ScrollUpButton>
              <Select.Viewport className={styles.SelectViewport}>
                <Select.Group>
                  {wallets.map((wallet, index) => (
                    <SelectItem key={index} value={wallet.name}>
                      {wallet.name}
                    </SelectItem>
                  ))}
                </Select.Group>

                <Select.Separator className={styles.SelectSeparator} />
              </Select.Viewport>
              <Select.ScrollDownButton
                className={styles.SelectScrollButton}
              ></Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      )}
    </div>
  );
};

interface TriggerProps {
  children: ReactNode;
  className?: string;
  value: string;
  disabled?: boolean;
}

const SelectItem = React.forwardRef<HTMLDivElement, TriggerProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames(styles.SelectItem, className)}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator
          className={styles.SelectItemIndicator}
        ></Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default SelectWallet;

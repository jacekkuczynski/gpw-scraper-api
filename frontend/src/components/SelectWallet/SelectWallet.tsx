"use client";

import React, { ReactNode } from "react";
import * as Select from "@radix-ui/react-select";
import styles from "./SelectWallet.module.css";
import classnames from "classnames";
import { SingleCompanyStartingData } from "@/types/types";
import { formatCompanyName } from "@/helpers";

// import "./styles.css";
// import { SelectItem } from "@radix-ui/react-select";

const SelectWallet = ({
  allCompaniesStartingData,
}: {
  allCompaniesStartingData: SingleCompanyStartingData[];
}) => (
  <div className={styles.selectWallet}>
    <Select.Root>
      <Select.Trigger className={styles.SelectTrigger} aria-label="Food">
        <Select.Value placeholder="wybierz spółkę" />
        <Select.Icon className={styles.SelectIcon}></Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={styles.SelectContent}>
          <Select.ScrollUpButton
            className={styles.SelectScrollButton}
          ></Select.ScrollUpButton>
          <Select.Viewport className={styles.SelectViewport}>
            <Select.Group>
              {allCompaniesStartingData.map((company) => (
                <SelectItem
                  key={company.symbol}
                  value={`${company.name} (${company.symbol})`}
                >
                  {`${formatCompanyName(company.name)} (${company.symbol})`}
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
  </div>
);

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

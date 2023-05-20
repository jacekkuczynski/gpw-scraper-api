"use client";

import React, { ReactNode } from "react";
import * as Select from "@radix-ui/react-select";
import styles from "./SelectWallet.module.css";
import classnames from "classnames";

// import "./styles.css";
// import { SelectItem } from "@radix-ui/react-select";

const SelectWallet = () => (
  <div className={styles.selectWallet}>
    <Select.Root>
      <Select.Trigger className={styles.SelectTrigger} aria-label="Food">
        <Select.Value placeholder="Select a fruit…" />
        <Select.Icon className={styles.SelectIcon}></Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={styles.SelectContent}>
          <Select.ScrollUpButton
            className={styles.SelectScrollButton}
          ></Select.ScrollUpButton>
          <Select.Viewport className={styles.SelectViewport}>
            <Select.Group>
              <Select.Label className={styles.SelectLabel}>Fruits</Select.Label>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </Select.Group>

            <Select.Separator className={styles.SelectSeparator} />

            <Select.Group>
              <Select.Label className={styles.SelectLabel}>
                Vegetables
              </Select.Label>
              <SelectItem value="aubergine">Aubergine</SelectItem>
              <SelectItem value="broccoli">Broccoli</SelectItem>
              <SelectItem value="carrot" disabled>
                Carrot
              </SelectItem>
              <SelectItem value="courgette">Courgette</SelectItem>
              <SelectItem value="leek">Leek</SelectItem>
            </Select.Group>

            <Select.Separator className={styles.SelectSeparator} />

            <Select.Group>
              <Select.Label className={styles.SelectLabel}>Meat</Select.Label>
              <SelectItem value="beef">Beef</SelectItem>
              <SelectItem value="chicken">Chicken</SelectItem>
              <SelectItem value="lamb">Lamb</SelectItem>
              <SelectItem value="pork">Pork</SelectItem>
            </Select.Group>
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

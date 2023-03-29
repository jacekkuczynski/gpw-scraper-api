"use client";

import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "./CompanyPopover.module.css";
import Link from "next/link";

const CompanyPopover = ({
  name,
  symbol,
  companyIndex,
}: {
  name: string;
  symbol: string;
  companyIndex?: number;
}) => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <div className={styles.popoverTrigger}>
        {companyIndex}. {name} <b>{symbol}</b>
      </div>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        className={styles.popoverContent}
        sideOffset={8}
        side={"right"}
      >
        <div>
          <p className={styles.text}>{name}</p>
          <p className={styles.text}>{symbol}</p>
          <button>
            <Link href={`/wallet/profile/${symbol}`}>go to {name} profile</Link>
          </button>
        </div>
        <Popover.Close className={styles.popoverClose} aria-label="Close">
          <Cross2Icon />
        </Popover.Close>
        <Popover.Arrow className={styles.popoverArrow} />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default CompanyPopover;

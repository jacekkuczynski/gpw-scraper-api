"use client";

import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./styles.css";

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
      <div>
        {companyIndex}. {name} <b>{symbol}</b>
      </div>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className="PopoverContent" sideOffset={8} side={"right"}>
        <div>
          <p className="Text">{name}</p>
          <p className="Text">{symbol}</p>
          <button>dodaj do watchlisty</button>
        </div>
        <Popover.Close className="PopoverClose" aria-label="Close">
          <Cross2Icon />
        </Popover.Close>
        <Popover.Arrow className="PopoverArrow" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default CompanyPopover;

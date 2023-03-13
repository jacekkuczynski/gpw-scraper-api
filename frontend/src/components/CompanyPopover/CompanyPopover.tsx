"use client";

import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons";
import "./styles.css";

const CompanyPopover = ({
  name,
  symbol,
  index,
}: {
  name: string;
  symbol: string;
  index: number;
}) => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <div>
        {index + 1}. {name}
        {symbol}
      </div>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className="PopoverContent" sideOffset={5}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p className="Text" style={{ marginBottom: 10 }}>
            {name}
          </p>
          <p className="Text" style={{ marginBottom: 10 }}>
            {symbol}
          </p>
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

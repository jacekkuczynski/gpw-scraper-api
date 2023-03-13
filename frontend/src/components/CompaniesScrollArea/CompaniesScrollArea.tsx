"use client";

import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import "./styles.css";
import { SingleCompanyStartingData } from "@/types/types";
import CompanyPopover from "../CompanyPopover/CompanyPopover";

interface CompaniesScrollAreaI {
  allCompaniesData: SingleCompanyStartingData[];
}

const CompaniesScrollArea = ({ allCompaniesData }: CompaniesScrollAreaI) => (
  <ScrollArea.Root className="ScrollAreaRoot">
    <ScrollArea.Viewport className="ScrollAreaViewport">
      <div style={{ padding: "15px 20px" }}>
        <div className="Text">Spółki notowane na GPW:</div>
        {allCompaniesData.map((company, index) => (
          <div key={company.symbol} className="Tag">
            <CompanyPopover
              name={company.name}
              symbol={company.symbol}
              index={index}
            />
          </div>
        ))}
      </div>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar
      className="ScrollAreaScrollbar"
      orientation="vertical"
    >
      <ScrollArea.Thumb className="ScrollAreaThumb" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Scrollbar
      className="ScrollAreaScrollbar"
      orientation="horizontal"
    >
      <ScrollArea.Thumb className="ScrollAreaThumb" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner className="ScrollAreaCorner" />
  </ScrollArea.Root>
);

export default CompaniesScrollArea;

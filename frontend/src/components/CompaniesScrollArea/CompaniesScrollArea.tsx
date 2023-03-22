"use client";

import { ChangeEvent, useState, useCallback } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import "./styles.css";
import { SingleCompanyStartingData } from "@/types/types";
import CompaniesScrollAreaCompaniesList from "./CompaniesScrollAreaCompaniesList";

interface CompaniesScrollAreaI {
  allCompaniesData: SingleCompanyStartingData[];
}

const CompaniesScrollArea = ({ allCompaniesData }: CompaniesScrollAreaI) => {
  const [input, setInput] = useState("");

  const handleSearchInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
    },
    []
  );

  return (
    <div className="Wrapper">
      <div className="Info">
        <div className="Scroll-title">Spółki notowane na GPW:</div>
        <div className="Search-input">
          <label htmlFor="search-input">wyszukaj</label>
          <input
            onChange={handleSearchInputChange}
            type="text"
            name="search-input"
          />
        </div>
      </div>
      <ScrollArea.Root className="ScrollAreaRoot">
        <ScrollArea.Viewport className="ScrollAreaViewport">
          <div>
            <CompaniesScrollAreaCompaniesList
              input={input}
              allCompaniesData={allCompaniesData}
            />
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
    </div>
  );
};

export default CompaniesScrollArea;

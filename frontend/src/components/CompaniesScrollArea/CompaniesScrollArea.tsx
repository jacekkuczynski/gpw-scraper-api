"use client";

import { useState } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import CompaniesScrollAreaCompaniesList from "./CompaniesList/CompaniesList";
import Searchbox from "./Searchbox/Searchbox";
import styles from "./CompaniesScrollArea.module.css";
import { SingleCompanyStartingData } from "@/types/types";

const CompaniesScrollArea = ({
  allCompaniesStartingData,
}: {
  allCompaniesStartingData: SingleCompanyStartingData[];
}) => {
  const [input, setInput] = useState("");

  const onSearchboxChange = (input: string) => setInput(input);

  return (
    <div className={styles.companiesScrollArea}>
      <Searchbox onSearchboxChange={onSearchboxChange} />
      <ScrollArea.Root className={styles.scrollAreaRoot}>
        <ScrollArea.Viewport className={styles.scrollAreaRoot}>
          <div>
            <CompaniesScrollAreaCompaniesList
              input={input}
              allCompaniesData={allCompaniesStartingData}
            />
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className={styles.scrollAreaScrollbar}
          orientation="vertical"
        >
          <ScrollArea.Thumb className={styles.scrollAreaThumb} />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className={styles.scrollAreaCorner} />
      </ScrollArea.Root>
    </div>
  );
};

export default CompaniesScrollArea;

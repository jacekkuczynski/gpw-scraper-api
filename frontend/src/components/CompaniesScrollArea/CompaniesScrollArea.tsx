"use client";

import { useState } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import CompaniesScrollAreaCompaniesList from "./CompaniesList/CompaniesList";
import Searchbox from "./Searchbox/Searchbox";
import styles from "./CompaniesScrollArea.module.css";
import { useQuery } from "react-query";
import { getAllCompaniesData } from "@/fetchers/getAllCompaniesData";

const CompaniesScrollArea = () => {
  const [input, setInput] = useState("");

  const { error, data } = useQuery("allCompaniesData", getAllCompaniesData);

  const onSearchboxChange = (input: string) => setInput(input);

  if (error instanceof Error) {
    console.log(error);
  }

  return (
    <div className={styles.companiesScrollArea}>
      <Searchbox onSearchboxChange={onSearchboxChange} />
      <ScrollArea.Root className={styles.scrollAreaRoot}>
        <ScrollArea.Viewport className={styles.scrollAreaRoot}>
          <div>
            {data ? (
              <CompaniesScrollAreaCompaniesList
                input={input}
                allCompaniesData={data}
              />
            ) : (
              <div>loading</div>
            )}
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

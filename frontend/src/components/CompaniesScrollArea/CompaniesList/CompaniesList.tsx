"use client";

import React, { useState, useEffect, useCallback } from "react";
import { SingleCompanyStartingData } from "@/types/types";
import styles from "./CompaniesList.module.css";
import Link from "next/link";
import { useParams } from "next/navigation";

interface CompaniesListI {
  input: string;
  allCompaniesData: SingleCompanyStartingData[];
}

const CompaniesList = ({ input, allCompaniesData }: CompaniesListI) => {
  const [filteredList, setFilteredList] = useState<SingleCompanyStartingData[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const { symbol } = useParams();

  const getFilteredList = useCallback(
    (input: string) => {
      return allCompaniesData.filter((company: SingleCompanyStartingData) => {
        return (
          company.endpoint.toLowerCase().includes(input.toLowerCase()) ||
          company.name.toLowerCase().includes(input.toLowerCase()) ||
          company.symbol.toLowerCase().includes(input.toLowerCase())
        );
      });
    },
    [allCompaniesData]
  );

  useEffect(() => {
    if (allCompaniesData) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setFilteredList(getFilteredList(input));
      }, 75);
    }
  }, [allCompaniesData, getFilteredList, input]);

  if (input == "") {
    return (
      <>
        {allCompaniesData ? (
          allCompaniesData.map((company) => (
            <div
              key={company.symbol}
              className={
                symbol == company.symbol
                  ? `${styles.Active} ${styles.Tag} `
                  : `${styles.Tag}`
              }
            >
              <Link href={`/profile/${company.symbol}`}>
                {company.companyIndex}. {company.name}
              </Link>
            </div>
          ))
        ) : (
          <div>loading</div>
        )}
      </>
    );
  } else if (filteredList.length == 0) {
    return (
      <div>
        Nie znaleziono żadnej spółki która pasuje do &quot;{input}&quot;
      </div>
    );
  } else {
    return (
      <>
        {filteredList?.map((company) => (
          <div
            key={company.symbol}
            className={
              symbol == company.symbol
                ? `${styles.Active} ${styles.Tag} `
                : `${styles.Tag}`
            }
          >
            <Link href={`/profile/${company.symbol}`}>
              {company.companyIndex}. {company.name}
            </Link>
          </div>
        ))}
      </>
    );
  }
};

export default CompaniesList;

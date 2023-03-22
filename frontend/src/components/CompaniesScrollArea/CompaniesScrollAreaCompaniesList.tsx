import React, { useState, useEffect } from "react";
import { SingleCompanyStartingData } from "@/types/types";
import CompanyPopover from "../CompanyPopover/CompanyPopover";

interface CompaniesScrollAreaCompaniesListI {
  input: string;
  allCompaniesData: SingleCompanyStartingData[];
}

const CompaniesScrollAreaCompaniesList = ({
  input,
  allCompaniesData,
}: CompaniesScrollAreaCompaniesListI) => {
  const [filteredList, setFilteredList] = useState<SingleCompanyStartingData[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFilteredList(
        allCompaniesData.filter((company: SingleCompanyStartingData) => {
          return (
            company.endpoint.toLowerCase().includes(input.toLowerCase()) ||
            company.name.toLowerCase().includes(input.toLowerCase()) ||
            company.symbol.toLowerCase().includes(input.toLowerCase())
          );
        })
      );
    }, 150);
  }, [allCompaniesData, input]);

  if (input == "") {
    return (
      <>
        {allCompaniesData.map((company) => (
          <div key={company.symbol} className="Tag">
            <CompanyPopover
              name={company.name}
              symbol={company.symbol}
              companyIndex={company.companyIndex}
            />
          </div>
        ))}
      </>
    );
  } else if (filteredList.length == 0) {
    return (
      <div className="Flex-center">
        Nie znaleziono żadnej spółki która pasuje do &quot;{input}&quot;
      </div>
    );
  } else if (isLoading) {
    return <div className="Flex-center">Loading...</div>;
  } else {
    return (
      <>
        {filteredList?.map((company) => (
          <div key={company.symbol} className="Tag">
            <CompanyPopover
              name={company.name}
              symbol={company.symbol}
              companyIndex={company.companyIndex}
            />
          </div>
        ))}
      </>
    );
  }
};

export default CompaniesScrollAreaCompaniesList;

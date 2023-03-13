"use client";

import { SingleCompanyStartingData } from "@/types/types";

interface AllCompaniesDataI {
  allCompaniesData: SingleCompanyStartingData[];
}
function AllCompaniesData({ allCompaniesData }: AllCompaniesDataI) {
  return (
    <>
      {allCompaniesData.map((company, index) => {
        return (
          <div key={company.symbol}>
            {index + 1}. {company.name}
            {company.symbol}
            {/* {company.endpoint} */}
          </div>
        );
      })}
    </>
  );
}

export default AllCompaniesData;

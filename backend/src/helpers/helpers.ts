export const removeDuplicates = (scrapedData) => {
  const scrapedDataRemovedDuplicates = Array.from(
    new Set(scrapedData.map((singleCompanyData) => singleCompanyData.symbol))
  ).map((symbol) => {
    return scrapedData.find(
      (singleCompanyData) => singleCompanyData.symbol === symbol
    );
  });
  return scrapedDataRemovedDuplicates;
};

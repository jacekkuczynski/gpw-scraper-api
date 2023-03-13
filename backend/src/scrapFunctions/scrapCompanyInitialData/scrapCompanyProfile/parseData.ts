export const parseData = (companiesData) => {
  const parseWebsiteAdress = (str: string) => {
    return str.replace(/^\s+|\s+$/g, "");
  };
  const parseEmailAdress = (str: string) => {
    return str.replace(/^\s+|\s+$/g, "");
  };

  const parseNumberOfStocks = (str: string): number => {
    return parseInt(str.replace(/\s/g, ""));
  };

  const parseMarketValue = (str: string): number => {
    return parseFloat(str.replace(/\s/g, "").replace(",", ".")) * 1000000;
  };

  const singleProfile = {
    listedSince: companiesData[0].value,
    numberOfStocks: parseNumberOfStocks(companiesData[1].value),
    marketValue: parseMarketValue(companiesData[2].value),
    name: companiesData[3].value,
    short: companiesData[4].value,
    fullName: companiesData[5].value,
    adress: companiesData[6].value,
    district: companiesData[7].value,
    ceoName: companiesData[8].value,
    phone: companiesData[9].value,
    website: parseWebsiteAdress(companiesData[10].value),
    email: parseEmailAdress(companiesData[11].value),
  };
  return singleProfile;
};

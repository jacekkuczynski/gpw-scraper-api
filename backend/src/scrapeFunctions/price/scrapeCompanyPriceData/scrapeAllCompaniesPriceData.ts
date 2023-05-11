import {
  readAllCompaniesData,
  writeCompanyPriceDataToDatabase,
} from "../../../prisma";
import { prisma } from "../../../index";
import { scrapeCompanyPriceData } from "./scrapeCompanyPriceData";

export const scrapeAllCompaniesPriceData = async () => {
  const allCompaniesData: {
    name: string;
    symbol: string;
    endpoint: string;
  }[] = await readAllCompaniesData(prisma);

  let allPrices: {
    name: string;
    symbol: string;
    date: string;
    price: number;
  }[] = [];

  const getPrices = async () => {
    for (const company of allCompaniesData) {
      let endpoint = company.endpoint;
      let price = await scrapeCompanyPriceData({ endpoint });
      const companyPrice = {
        name: company.name,
        symbol: company.symbol,
        price: parseFloat(price.replace(",", ".")),
        date: new Date().toISOString().slice(0, 10),
      };
      allPrices.push(companyPrice);
      console.log(allPrices[allPrices.length - 1]);
      writeCompanyPriceDataToDatabase(companyPrice, prisma);
    }
  };
  await getPrices();
  return allPrices;
};

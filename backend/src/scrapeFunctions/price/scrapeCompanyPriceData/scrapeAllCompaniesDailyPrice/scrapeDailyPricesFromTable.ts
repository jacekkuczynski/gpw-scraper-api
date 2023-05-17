import { Page } from "puppeteer";
import { companiesTableSelector } from "../../../company/scrapeAllCompaniesData/selectors";

export const scrapeDailyPricesFromTable = async (page: Page) => {
  const companiesTableDOM = await page.waitForSelector(companiesTableSelector);
  const companiesData = await companiesTableDOM.$$eval("tr", (rows) => {
    const parsePrice = (str: string) => {
      if (typeof str == "string") return parseFloat(str.replace(",", "."));
    };
    const parseSymbol = (str: string) => {
      str = str.trim();
      str = str.slice(1, str.length - 1);
      return str;
    };
    return rows.map((row) => {
      const value = parsePrice(row.querySelector(".summary").textContent);
      const symbolElement = row.querySelector("span.grey");
      const symbol = parseSymbol(symbolElement.textContent);
      const time = new Date()
        .toLocaleDateString("en-US")
        .toString()
        .replaceAll("/", "-");
      return { value, time, symbol };
    });
  });
  return companiesData;
};

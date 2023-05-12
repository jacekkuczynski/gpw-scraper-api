import { Page } from "puppeteer";
import { companiesTableSelector } from "../../../company/scrapeAllCompaniesData/selectors";

export const scrapeDailyPricesFromTable = async (page: Page) => {
  const companiesTableDOM = await page.waitForSelector(companiesTableSelector);
  const companiesData = await companiesTableDOM.$$eval("tr", (rows) => {
    const parseName = (str: string) => {
      str = str.replace(/\n/g, "");
      str = str.replace(/\([^)]*\)/g, "");
      str = str.trim();
      return str;
    };
    const parsePrice = (str: string) => {
      if (typeof str == "string") return parseFloat(str.replace(",", "."));
    };
    const parseSymbol = (str: string) => {
      str = str.trim();
      str = str.slice(1, str.length - 1);
      return str;
    };
    return rows.map((row) => {
      const nameElement = row.querySelector(".name");
      const name = parseName(nameElement.textContent);
      const price = parsePrice(row.querySelector(".summary").textContent);
      const symbolElement = row.querySelector("span.grey");
      const symbol = parseSymbol(symbolElement.textContent);
      const date = new Date().toISOString().slice(0, 10);
      return { name, price, date, symbol };
    });
  });
  return companiesData;
};

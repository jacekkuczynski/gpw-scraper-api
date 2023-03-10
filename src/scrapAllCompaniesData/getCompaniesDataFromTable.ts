import { Page } from "puppeteer";
import { companiesTableSelector } from "../selectors";

export const getCompaniesDataFromTable = async (page: Page) => {
  const companiesTableDOM = await page.waitForSelector(companiesTableSelector);
  const companiesData = await companiesTableDOM.$$eval("tr", (rows) => {
    const parseName = (str: string) => {
      str = str.replace(/\n/g, "");
      str = str.replace(/\([^)]*\)/g, "");
      str = str.trim();
      return str;
    };
    const parseSymbol = (str: string) => {
      str = str.trim();
      str = str.slice(1, str.length - 1);
      return str;
    };
    const parseWebsiteSymbol = (str: string) => {
      const websiteSymbolLength = 8;
      str = str.slice(-websiteSymbolLength);
      return str;
    };
    return rows.map((row) => {
      const linkElement = row.querySelector("a");
      const nameElement = row.querySelector(".name");
      const symbolElement = row.querySelector("span.grey");
      const href = linkElement.href;
      const name = parseName(nameElement.textContent);
      const symbol = parseSymbol(symbolElement.textContent);
      const websiteSymbol = parseWebsiteSymbol(href);
      return { name, symbol, websiteSymbol };
    });
  });
  return companiesData;
};

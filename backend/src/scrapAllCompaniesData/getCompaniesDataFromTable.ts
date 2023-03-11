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
    const parseEndpoint = (str: string) => {
      const endpointLength = 8;
      str = str.slice(-endpointLength);
      return str;
    };
    return rows.map((row) => {
      const linkElement = row.querySelector("a");
      const nameElement = row.querySelector(".name");
      const symbolElement = row.querySelector("span.grey");
      const href = linkElement.href;
      const name = parseName(nameElement.textContent);
      const symbol = parseSymbol(symbolElement.textContent);
      const endpoint = parseEndpoint(href);
      return { name, symbol, endpoint };
    });
  });
  return companiesData;
};

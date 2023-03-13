import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { clickOnCookiesConsent } from "../../../helpers/clickOnCookiesConsent";
import { parseData } from "./parseData";

export const scrapCompanyProfile = async ({
  endpoint,
}: {
  endpoint: string;
}) => {
  const pageUrl = `https://www.gpw.pl/spolka?isin=${endpoint}#infoTab`;
  return await puppeteer
    .use(StealthPlugin())
    .launch({ headless: false })
    .then(async (browser) => {
      const page = await browser.newPage();
      await page.goto(pageUrl, {
        waitUntil: "networkidle0",
        timeout: 0,
      });
      await clickOnCookiesConsent(page);
      console.log("Scrapping company profile 🚀");
      const companyProfileTableDOM = await page.waitForSelector(
        "table.footable.table tbody"
      );
      const companyProfile = await companyProfileTableDOM.$$eval(
        "tr",
        async (rows) => {
          const profile = rows.map((row) => {
            const nameElement = row.querySelector("th");
            const valueElement = row.querySelector("td");
            const name = nameElement.textContent;
            const value = valueElement.textContent;
            return { name, value };
          });

          return profile;
        }
      );
      await browser.close();
      return parseData(companyProfile);
    });
};

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { clickOnLoadMoreButton } from "./clickOnLoadMoreButton";
import { clickOnCookiesConsent } from "../../helpers/clickOnCookiesConsent";
import { isLoadMoreButtonVisible } from "./isLoadMoreButtonVisible";
import { loadingDataIntoTable } from "./loadingDataIntoTable";
import { getCompaniesDataFromTable } from "./getCompaniesDataFromTable";
import { removeDuplicates } from "../../helpers/helpers";

export const scrapAllCompaniesData = async () => {
  return await puppeteer
    .use(StealthPlugin())
    .launch({ headless: false })
    .then(async (browser) => {
      const pageUrl = "https://www.gpw.pl/spolki";
      const page = await browser.newPage();
      console.log(`going to ${pageUrl}`);
      await page.goto(pageUrl, {
        waitUntil: "networkidle0",
        timeout: 0,
      });
      console.log(
        "Scrapping all companies data (name, symbol, endpoint)... 🚀"
      );
      let scrapedData = [];
      await clickOnCookiesConsent(page);

      const scrapData = async () => {
        let isLoadMoreButton = await isLoadMoreButtonVisible(page);
        if (isLoadMoreButton) {
          await clickOnLoadMoreButton(page);
          await loadingDataIntoTable(page);
          await scrapData();
        } else {
          const data = await getCompaniesDataFromTable(page);
          scrapedData = removeDuplicates(data);
          console.log("All done! ✨");
          await browser.close();
          return;
        }
        return scrapedData;
      };

      return await scrapData();
    });
};

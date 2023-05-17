import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { clickOnCookiesConsent } from "../../../../helpers/clickOnCookiesConsent";
import { interceptImageFontMediaRequest } from "../../../../helpers/helpers";
import { prisma } from "../../../../index";
import { writeDailyPricesToDb } from "../../../../prisma";
import { clickOnLoadMoreButton } from "../../../company/scrapeAllCompaniesData/clickOnLoadMoreButton";
import { isLoadMoreButtonVisible } from "../../../company/scrapeAllCompaniesData/isLoadMoreButtonVisible";
import { loadDataIntoTable } from "../../../company/scrapeAllCompaniesData/loadDataIntoTable";
import { scrapeDailyPricesFromTable } from "./scrapeDailyPricesFromTable";

export const scrapeAllCompaniesDailyPrice = async () => {
  const allCompaniesDailyPrices = await puppeteer
    .use(StealthPlugin())
    .launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    })
    .then(async (browser) => {
      const url = "https://www.gpw.pl/spolki";
      const page = await browser.newPage();
      await interceptImageFontMediaRequest(page);
      await page.goto(url, {
        timeout: 0,
      });
      await clickOnCookiesConsent(page);
      console.log(new Date().toISOString());
      console.log(
        "Scrapping daily price of all companies started 🚀",
        new Date().toLocaleTimeString("pl-PL")
      );

      let scrapedData = [];
      const scrapeDailyPrices = async () => {
        let isLoadMoreButton = await isLoadMoreButtonVisible(page);
        if (isLoadMoreButton) {
          await clickOnLoadMoreButton(page);
          await loadDataIntoTable(page);
          await scrapeDailyPrices();
          let i = ".";
          i += ".";
          console.log(`loading.${i}`);
        } else {
          console.log(`scraping data...`);
          const data = await scrapeDailyPricesFromTable(page);
          scrapedData = data;
          await browser.close();
          return;
        }
        return scrapedData;
      };

      return await scrapeDailyPrices();
    });

  writeDailyPricesToDb(allCompaniesDailyPrices, prisma);
};

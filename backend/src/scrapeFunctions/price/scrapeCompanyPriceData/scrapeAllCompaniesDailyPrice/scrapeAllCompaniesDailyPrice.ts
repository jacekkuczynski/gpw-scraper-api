import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { clickOnCookiesConsent } from "../../../../helpers/clickOnCookiesConsent";
import {
  interceptImageFontMediaRequest,
  removeDuplicates,
} from "../../../../helpers/helpers";
import { prisma } from "../../../../index";
import { writeDailyPricesToDb } from "../../../../prisma";
import { clickOnLoadMoreButton } from "../../../company/scrapeAllCompaniesData/clickOnLoadMoreButton";
import { loadDataIntoTable } from "../../../company/scrapeAllCompaniesData/loadDataIntoTable";
import { scrapeDailyPricesFromTable } from "./scrapeDailyPricesFromTable";
import { isLoadMoreButtonVisible } from "../../../company/scrapeAllCompaniesData/isLoadMoreButtonVisible";

export const scrapeAllCompaniesDailyPrice = async () => {
  const allCompaniesDailyPrices = await puppeteer
    .use(StealthPlugin())
    .launch({
      args: ["--incognito", "--no-sandbox", "--disable-setuid-sandbox"],
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
        } else {
          console.log(`scraping data...`);
          const data = await scrapeDailyPricesFromTable(page);
          scrapedData = removeDuplicates(data);
          await browser.close();
          return;
        }
        return scrapedData;
      };

      return await scrapeDailyPrices();
    });

  writeDailyPricesToDb(allCompaniesDailyPrices, prisma);
};

// bug on gpw.pl website - if you click "load more btn" last time table disaapear 22/05/23
// workaround

// let loadedTREelements = 0;
// loadedTREelements = await page.$$eval(
//   "#search-result tr",
//   (tds) => tds.length
// );
// const fullyLoadedTDElements = 430;
// if (loadedTREelements !== fullyLoadedTDElements) {}

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
import { isLoadMoreButtonVisible } from "../../../company/scrapeAllCompaniesData/isLoadMoreButtonVisible";
import { loadDataIntoTable } from "../../../company/scrapeAllCompaniesData/loadDataIntoTable";
import { scrapeDailyPricesFromTable } from "./scrapeDailyPricesFromTable";

export const scrapeAllCompaniesDailyPrice = async () => {
  const allCompaniesDailyPrices = await puppeteer
    .use(StealthPlugin())
    .launch()
    .then(async (browser) => {
      const url = "https://www.gpw.pl/spolki";
      const page = await browser.newPage();
      await interceptImageFontMediaRequest(page);
      await page.goto(url, {
        timeout: 0,
      });
      await clickOnCookiesConsent(page);
      console.log(new Date().toISOString());
      console.log("Scrapping daily price of all companies🚀");

      let scrapedData = [];
      const scrapeAllCompaniesData = async () => {
        let isLoadMoreButton = await isLoadMoreButtonVisible(page);
        if (isLoadMoreButton) {
          await clickOnLoadMoreButton(page);
          await loadDataIntoTable(page);
          await scrapeAllCompaniesData();
        } else {
          const data = await scrapeDailyPricesFromTable(page);
          scrapedData = removeDuplicates(data);
          console.log("All done! ✨");
          await browser.close();
          return;
        }
        return scrapedData;
      };

      return await scrapeAllCompaniesData();
    });

  writeDailyPricesToDb(allCompaniesDailyPrices, prisma);
};

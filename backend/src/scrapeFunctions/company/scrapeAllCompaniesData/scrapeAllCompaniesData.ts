import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { clickOnCookiesConsent } from "../../../helpers/clickOnCookiesConsent";
import {
  interceptImageFontMediaRequest,
  removeDuplicates,
} from "../../../helpers/helpers";
import { prisma } from "../../../index";
import { saveAllCompaniesDataToDatabase } from "../../../database/prisma";
import { clickOnLoadMoreButton } from "./clickOnLoadMoreButton";
import { getCompaniesDataFromTable } from "./getCompaniesDataFromTable";
import { isLoadMoreButtonVisible } from "./isLoadMoreButtonVisible";
import { loadDataIntoTable } from "./loadDataIntoTable";

export const scrapeAllCompaniesData = async () => {
  const allCompaniesData = await puppeteer
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
      console.log(
        "Scrapping all companies data (name, symbol, endpoint)... 🚀"
      );

      let scrapedData = [];
      const scrapeAllCompaniesData = async () => {
        let isLoadMoreButton = await isLoadMoreButtonVisible(page);
        if (isLoadMoreButton) {
          await clickOnLoadMoreButton(page);
          await loadDataIntoTable(page);
          await scrapeAllCompaniesData();
        } else {
          const data = await getCompaniesDataFromTable(page);
          scrapedData = removeDuplicates(data);
          console.log("All done! ✨");
          await browser.close();
          return;
        }
        return scrapedData;
      };

      return await scrapeAllCompaniesData();
    });

  saveAllCompaniesDataToDatabase(allCompaniesData, prisma);
};

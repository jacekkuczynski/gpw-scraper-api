import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { interceptImageFontMediaRequest } from "../../../helpers/helpers";
import { prisma } from "../../../index";
import {
  readAllCompaniesData,
  readCompaniesInitialData,
} from "../../../prisma";
import { scrapeAllCompaniesData } from "../scrapeAllCompaniesData/scrapeAllCompaniesData";
import { scrapeCompanyInitialData } from "../scrapeCompanyInitialData/scrapeCompanyInitialData";

const allCompaniesCount = 410;

export const scrapeAllCompaniesInitialData = async () => {
  let allCompaniesData: {
    name: string;
    symbol: string;
    endpoint: string;
  }[] = await readAllCompaniesData(prisma);

  if (allCompaniesData.length < 1) {
    console.log("scraping all companies data");
    await scrapeAllCompaniesData();
    allCompaniesData = await readAllCompaniesData(prisma);
  }
  if ((await readCompaniesInitialData(prisma)).length > 1) return;

  await puppeteer
    .use(StealthPlugin())
    .launch({ headless: true, devtools: false })
    .then(async (browser) => {
      const page = await browser.newPage();
      await page.setViewport({
        width: 1360,
        height: 1000,
        deviceScaleFactor: 1,
      });

      interceptImageFontMediaRequest(page);

      let iteration = 1;

      const scrap = async () => {
        for (const company of allCompaniesData) {
          try {
            console.log(
              iteration,
              "/",
              allCompaniesData.length,
              company.name,
              new Date().toISOString().slice(11, 19),
              "UTC"
            );
            const endpoint = company.endpoint;
            const data = await scrapeCompanyInitialData({
              endpoint,
              page,
              iteration,
            });
            iteration++;
          } catch (e) {
            await page.reload();
            console.log(e);
          }
        }
      };
      await scrap();
      await browser.close();
    });
};

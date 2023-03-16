import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { clickOnCookiesConsent } from "../../helpers/clickOnCookiesConsent";
import { scrapCompanyProfile } from "./scrapCompanyProfile/scrapCompanyProfile";
import { scrapCompanyShareholders } from "./scrapCompanyShareholders/scrapCompanyShareholders";

export const scrapCompanyInitialData = async ({ endpoint }) => {
  const pageUrl = `https://www.gpw.pl/spolka?isin=${endpoint}`;
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

      console.log("Scrapping company profile data 🚀");
      const companyProfile = await scrapCompanyProfile({ page });

      console.log("Scrapping company shareholders data 🚀");
      const shareholdersData = await scrapCompanyShareholders({
        page,
      });

      await browser.close();
      return { companyProfile, shareholdersData };
    });
};

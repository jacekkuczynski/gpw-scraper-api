import { Page } from "puppeteer";
import { acceptCookiesSelector } from "../scrapFunctions/scrapAllCompaniesData/selectors";

export const clickOnCookiesConsent = async (page: Page) => {
  await page.waitForSelector(acceptCookiesSelector);
  await page.click(acceptCookiesSelector);
};

import { Page } from "puppeteer";

export const clickOnCookiesConsent = async (page: Page) => {
  const selector = "#onetrust-accept-btn-handler";
  await page.waitForSelector(selector);

  await page.evaluate(() => {
    const cookiesConsentBtn = document.querySelector(
      "#onetrust-accept-btn-handler"
    );

    if (cookiesConsentBtn instanceof HTMLElement) cookiesConsentBtn.click();
  });
};

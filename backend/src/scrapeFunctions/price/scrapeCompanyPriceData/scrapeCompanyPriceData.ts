import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { interceptImageFontMediaRequest } from "../../../helpers/helpers";

export const scrapeCompanyPriceData = async ({ endpoint }): Promise<any> => {
  return await puppeteer
    .use(StealthPlugin())
    .launch()
    .then(async (browser) => {
      const page = await browser.newPage();
      await interceptImageFontMediaRequest(page);

      const url = `https://www.gpw.pl/spolka?isin=${endpoint}`;
      await page.goto(url, {
        timeout: 0,
      });

      async function getPrice() {
        try {
          await page.waitForSelector("div.header span", {
            visible: true,
          });
          const price = await page.evaluate(async () => {
            const closePriceDOM = document.querySelector("div.header span");
            return closePriceDOM?.textContent || "420,69";
          });
          return price;
        } catch (e) {
          if (e.message === "Navigation timeout") {
            await page.reload();
            getPrice();
          }
        }
      }

      const price = await getPrice();

      await browser.close();
      return price;
    });
};

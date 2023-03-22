import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { interceptImageFontMediaRequest } from "../../../helpers/helpers";

export interface PriceI {
  time: string;
  open: string;
  high: string;
  low: string;
  close: string;
}

export const scrapeCompanyPriceData = async ({ endpoint }): Promise<PriceI> => {
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

      const time = new Date().toISOString().slice(0, 10);

      const open = await page.evaluate(() => {
        const openPriceDOM = document.querySelector(
          ".row :first-child :nth-child(2) tbody :nth-child(2) :nth-child(2) "
        );
        const openPrice = openPriceDOM.textContent;
        return openPrice;
      });

      const high = await page.evaluate(() => {
        const minMaxDOM = document.querySelector(".max_min");
        function parseMaxPrice(str) {
          const cleanStr = str.replace(/\s/g, "");
          const substrings = cleanStr.split(/min|max/g).filter(Boolean);
          const max = substrings[1].replace(",", ".");
          return max;
        }
        return parseMaxPrice(minMaxDOM.textContent);
      });

      const low = await page.evaluate(() => {
        const minMaxDOM = document.querySelector(".max_min");
        function parseMinPrice(str) {
          const cleanStr = str.replace(/\s/g, "");
          const substrings = cleanStr.split(/min|max/g).filter(Boolean);
          const min = substrings[0].replace(",", ".");
          return min;
        }
        return parseMinPrice(minMaxDOM.textContent);
      });

      const close = await page.evaluate(() => {
        const closePriceDOM = document.querySelector("span.summary");
        return closePriceDOM.textContent;
      });

      return { time, open, high, low, close };
    });
};

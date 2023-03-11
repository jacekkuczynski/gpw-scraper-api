import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { clickOnCookiesConsent } from "../../../helpers/clickOnCookiesConsent";

export const scrapCompanyShareholders = async ({
  endpoint,
}: {
  endpoint: string;
}) => {
  const pageUrl = `https://www.gpw.pl/spolka?isin=${endpoint}#shareholdersTab`;
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
      console.log("Scrapping company shareholders data 🚀");
      await page.waitForSelector("table.footable.table tbody ");

      const shareholdersData = await page.evaluate(() => {
        const shareholdersTableWithTitle = document.querySelector(
          "table.footable.table tbody "
        );
        const shareholdersTable =
          shareholdersTableWithTitle.querySelectorAll("tr");
        const shareholdersTableDOM = [...shareholdersTable]
          .slice(1)
          .map((el) => {
            const parseStockAmount = (str: string) => {
              str = str.replace(/\u00A0/g, " ");
              const num = parseFloat(str);
              return num;
            };
            const parsePercentage = (str: string) => {
              str = str.replace(",", "");
              const num = parseFloat(str) / 100;
              return num;
            };
            const nameDOM = el.querySelector(":first-child");
            const stockAmountDOM = el.querySelector(":nth-child(2)");
            const stockPercentageDOM = el.querySelector(":nth-child(3)");
            const name = nameDOM.textContent;
            const stockAmount = parseStockAmount(stockAmountDOM.textContent);
            const stockPercentage = parsePercentage(
              stockPercentageDOM.textContent
            );

            return { name, stockAmount, stockPercentage };
          });

        return shareholdersTableDOM;
      });

      await browser.close();
      return shareholdersData;
    });
};

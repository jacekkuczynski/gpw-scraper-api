import { Page } from "puppeteer";

export const scrapCompanyShareholders = async ({ page }: { page: Page }) => {
  await page.waitForNetworkIdle();

  const shareholdersTabSelector = `li.shareholdersTab`;
  await page.waitForSelector(shareholdersTabSelector);
  await page.click(shareholdersTabSelector);
  console.log("Scrapping company shareholders data 🚀");
  await page.waitForSelector("#shareholdersTab table tbody");

  const shareholdersData = await page.evaluate(() => {
    const shareholdersTableWithTitle = document.querySelector(
      "#shareholdersTab table tbody"
    );
    const shareholdersTable = shareholdersTableWithTitle.querySelectorAll("tr");

    const data = [...shareholdersTable].slice(1).map((el) => {
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
      const stockPercentage = parsePercentage(stockPercentageDOM.textContent);

      return { name, stockAmount, stockPercentage };
    });

    return data;
  });

  return shareholdersData;
};

import { Page } from "puppeteer";

export const scrapeCompanyShareholders = async ({ page }: { page: Page }) => {
  const shareholdersTabSelector = `li.shareholdersTab a`;
  await page.waitForSelector(shareholdersTabSelector);
  await page.click(shareholdersTabSelector);
  await page.waitForSelector("#shareholdersTab table tbody");

  const shareholdersData = await page.evaluate(() => {
    const shareholdersTableWithTitle = document.querySelector(
      "#shareholdersTab table tbody"
    );
    const shareholdersTable = shareholdersTableWithTitle.querySelectorAll("tr");

    const data = [...shareholdersTable].slice(1).map((el) => {
      const nameDOM = el.querySelector(":first-child");
      const stockAmountDOM = el.querySelector(":nth-child(2)");
      const stockPercentageDOM = el.querySelector(":nth-child(3)");
      const name = nameDOM.textContent;
      const stockAmount = parseStockAmount(stockAmountDOM.textContent);
      const stockPercentage = parsePercentage(stockPercentageDOM.textContent);

      return { name, stockAmount, stockPercentage };
    });

    function parseStockAmount(value: string | number): string {
      return typeof value == "string"
        ? value.replace(/\u00A0/g, " ")
        : value.toString().replace(/\u00A0/g, " ");
    }
    function parsePercentage(str: string) {
      str = str.replace(",", "");
      const num = parseFloat(str) / 100;
      return num;
    }

    return data;
  });

  return shareholdersData;
};

import { Page } from "puppeteer";
import { parseData } from "./parseData";

export const scrapCompanyProfile = async ({ page }: { page: Page }) => {
  await page.waitForNetworkIdle();
  const companyProfileTabSelector = "li.infoTab";
  await page.waitForSelector(companyProfileTabSelector);
  console.log("Scrapping company profile 🚀");
  await page.click(companyProfileTabSelector);

  await page.waitForSelector("#infoTab");

  const companyProfile = await page.evaluate(() => {
    const companyProfileTable = document.querySelector("#infoTab table tbody");
    const companyProfileRows = companyProfileTable.querySelectorAll("tr");

    return Array.from(companyProfileRows).map((row) => {
      console.log(row, "row");
      const nameElement = row.querySelector("th");
      const valueElement = row.querySelector("td");
      const name = nameElement.textContent;
      const value = valueElement.textContent;
      return { name, value };
    });
  });

  return parseData(companyProfile);
};

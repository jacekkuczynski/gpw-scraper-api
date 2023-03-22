import { Page } from "puppeteer";

export const loadDataIntoTable = async (page: Page) => {
  const element = await page.$("#preview-area");

  await page.waitForFunction(
    (element) => {
      const style = getComputedStyle(element);
      return style.getPropertyValue("display") === "none";
    },
    {},
    element
  );
};

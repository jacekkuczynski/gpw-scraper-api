import { Page } from "puppeteer";
import { showMoreSelector } from "./selectors";

export const clickOnLoadMoreButton = async (page: Page) => {
  const loadMoreButton = await page.waitForSelector(showMoreSelector);
  if (loadMoreButton) await page.click(showMoreSelector);
};

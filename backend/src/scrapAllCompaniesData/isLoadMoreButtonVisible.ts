import { Page } from "puppeteer";
import { loadMoreButtonWrapper } from "../selectors";

export const isLoadMoreButtonVisible = async (page: Page) => {
  await page.waitForSelector(loadMoreButtonWrapper);
  const loadMoreButtonStyle = await page.evaluate(
    () => document.querySelector<HTMLElement>(".pager-company").style.display
  );
  return loadMoreButtonStyle == "none" ? false : true;
};

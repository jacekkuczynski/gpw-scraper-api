import { Page } from "puppeteer";

export const removeDuplicates = (scrapedData) => {
  const scrapedDataRemovedDuplicates = Array.from(
    new Set(scrapedData.map((singleCompanyData) => singleCompanyData.symbol))
  ).map((symbol) => {
    return scrapedData.find(
      (singleCompanyData) => singleCompanyData.symbol === symbol
    );
  });
  return scrapedDataRemovedDuplicates;
};

export const interceptImageFontMediaRequest = async (page: Page) => {
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    if (
      req.resourceType() == "image" ||
      req.resourceType() == "font" ||
      req.resourceType() == "media"
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });
};

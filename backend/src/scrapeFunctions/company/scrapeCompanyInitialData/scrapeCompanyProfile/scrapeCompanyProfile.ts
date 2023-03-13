import { Page } from "puppeteer";

export const scrapeCompanyProfile = async ({ page }: { page: Page }) => {
  const companyProfileTabSelector = "li.infoTab a";
  await page.waitForSelector(companyProfileTabSelector);
  await page.click(companyProfileTabSelector);
  await page.waitForSelector("#infoTab table tbody");

  const profile = await page.evaluate(async () => {
    const profileDOM = document.querySelector("#infoTab table tbody");
    const listedSince = profileDOM.querySelector(":first-child td").textContent;
    const numberOfStocks = parseNumberOfStocks(
      profileDOM.querySelector(":nth-child(2) td").textContent
    );
    const marketValue = parseMarketValue(
      profileDOM.querySelector(":nth-child(3) td").textContent
    );
    const symbol = profileDOM.querySelector(":nth-child(5) td").textContent;
    const name = profileDOM.querySelector(":nth-child(6) td").textContent;
    const adress = profileDOM.querySelector(":nth-child(7) td").textContent;
    const district = profileDOM.querySelector(":nth-child(8) td").textContent;
    const ceoName = profileDOM.querySelector(
      "#infoTab table tbody :nth-child(9) td"
    ).textContent;
    const website = parseWebsiteAdress(
      profileDOM.querySelector("#infoTab table tbody :nth-child(12) td")
        .textContent
    );
    const description = "";
    const shareholders = [];

    const profileData = {
      listedSince,
      numberOfStocks,
      marketValue,
      symbol,
      name,
      adress,
      district,
      ceoName,
      website,
      description,
      shareholders,
    };

    function parseWebsiteAdress(str: string) {
      return str.replace(/^\s+|\s+$/g, "");
    }
    function parseNumberOfStocks(value: string | number): string {
      return typeof value == "string"
        ? value.replace(/\s/g, "")
        : value.toString().replace(/\s/g, "");
    }
    function parseMarketValue(str: string): string {
      return str.replace(/\s/g, "").replace(",", ".");
    }

    return profileData;
  });

  await page.waitForSelector("aside p");
  const description = await page.evaluate(() => {
    const descriptionDOM = document.querySelector("aside p");
    const description = descriptionDOM.textContent;
    return description;
  });
  profile.description = description;

  return profile;
};

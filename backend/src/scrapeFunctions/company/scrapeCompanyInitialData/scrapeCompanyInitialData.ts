import { Page } from "puppeteer";
import { clickOnCookiesConsent } from "../../../helpers/clickOnCookiesConsent";
import { prisma } from "../../../index";
import { saveCompanyInitialDataToDB } from "../../../database/prisma";
import { scrapeCompanyProfile } from "./scrapeCompanyProfile/scrapeCompanyProfile";
import { scrapeCompanyShareholders } from "./scrapeCompanyShareholders/scrapeCompanyShareholders";

export const scrapeCompanyInitialData = async ({
  endpoint,
  page,
  iteration,
}: {
  endpoint: string;
  page: Page;
  iteration: number;
}) => {
  const url = `https://www.gpw.pl/spolka?isin=${endpoint}`;
  await page.goto(url, {
    timeout: 0,
  });

  if (iteration == 1) await clickOnCookiesConsent(page);

  const companyProfile = await scrapeCompanyProfile({
    page,
  });
  const shareholdersData = await scrapeCompanyShareholders({
    page,
  });

  companyProfile.shareholders = shareholdersData;

  await saveCompanyInitialDataToDB(companyProfile, prisma);
  console.log("saved to db:", companyProfile.symbol);

  return companyProfile;
};

import { scrapeAllCompaniesDailyPrice } from "../scrapeFunctions/price/scrapeCompanyPriceData/scrapeAllCompaniesDailyPrice/scrapeAllCompaniesDailyPrice";

export const scheduleDailyPricesScrape = () => {
  const schedule = require("node-schedule");
  const job = schedule.scheduleJob(`${15} 18 * * 1-5`, function () {
    scrapeAllCompaniesDailyPrice();
  });
};

function generateRandomTime() {}

let randomMinute = generateRandomTime();

const schedule = require("node-schedule");
import { scrapeAllCompaniesDailyPrice } from "../scrapeFunctions/price/scrapeCompanyPriceData/scrapeAllCompaniesDailyPrice/scrapeAllCompaniesDailyPrice";

export const scheduleDailyPricesScrap = () => {
  const schedule = require("node-schedule");

  const job = schedule.scheduleJob("15 17 * * 1-5", function () {
    scrapeAllCompaniesDailyPrice();
  });
};

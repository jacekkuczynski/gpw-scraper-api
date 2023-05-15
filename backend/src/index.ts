import { PrismaClient } from "@prisma/client";
import express from "express";
import morgan from "morgan";
import { scrapeAllCompaniesInitialData } from "./scrapeFunctions/company/scrapeAllCompaniesInitialData/scrapeAllCompaniesInitialData";
import cors from "cors";
import helmet from "helmet";
import { scheduleDailyPricesScrape } from "./schedule/scheduleDailyPricesScrap";

import router from "./routes";
import { scrapeAllCompaniesDailyPrice } from "./scrapeFunctions/price/scrapeCompanyPriceData/scrapeAllCompaniesDailyPrice/scrapeAllCompaniesDailyPrice";

export const prisma = new PrismaClient();
const port = process.env.PORT;

const server = async () => {
  await scrapeAllCompaniesInitialData();
  scheduleDailyPricesScrape();

  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(morgan("tiny")); //  log format ":method :url :status :res[content-length] - :response-time ms"

  app.use("/", router);

  app.get("/test", async (req, res) => {
    console.log("let's go");
    await scrapeAllCompaniesDailyPrice();
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

server();

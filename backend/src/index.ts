import { PrismaClient } from "@prisma/client";
import express from "express";
import morgan from "morgan";
import { scrapeAllCompaniesInitialData } from "./scrapeFunctions/company/scrapeAllCompaniesInitialData/scrapeAllCompaniesInitialData";
import { readAllCompaniesData, readCompanyProfile } from "./prisma";
import cors from "cors";
import helmet from "helmet";
import { scheduleDailyPricesScrap } from "./schedule/scheduleDailyPricesScrap";

export const prisma = new PrismaClient();

const server = async () => {
  await scrapeAllCompaniesInitialData();
  scheduleDailyPricesScrap();
  const app = express();

  app.use(helmet());
  app.use(cors());

  app.use(morgan("tiny")); //  log format ":method :url :status :res[content-length] - :response-time ms"

  app.get("/data", async (req, res) => {
    const isAll = req.query.all;
    if (isAll) {
      const allCompaniesData = await readAllCompaniesData(prisma);
      res.json(allCompaniesData);
    }
  });

  app.get("/profile", async (req, res) => {
    const symbol = req.query.symbol.toString().toUpperCase();
    const companyProfile = await readCompanyProfile(prisma, symbol);
    res.json(companyProfile);
  });

  // app.get("/price", async (req, res) => {
  //   const symbol = req.query.symbol.toString().toUpperCase();
  //   const companyPrice = await readCompanyPrice(prisma, symbol);
  //   res.json(companyProfile);
  // });

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

server();

import { PrismaClient } from "@prisma/client";
import express from "express";
import morgan from "morgan";
import { scrapeAllCompaniesInitialData } from "./scrapeFunctions/company/scrapeAllCompaniesInitialData/scrapeAllCompaniesInitialData";
import { readAllCompaniesData, readCompanyProfile } from "./prisma";

export const prisma = new PrismaClient();

//  helmet with ES6 export syntax breaks the app for now
const helmet = require("helmet");

const server = async () => {
  await scrapeAllCompaniesInitialData();

  const app = express();
  app.use(helmet());
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

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

server();

import { PrismaClient } from "@prisma/client";
import express from "express";

import { scrapeAllCompaniesInitialData } from "./scrapeFunctions/company/scrapeAllCompaniesInitialData/scrapeAllCompaniesInitialData";
import { readAllCompaniesData, readCompanyProfile } from "./prisma";

export const prisma = new PrismaClient();

const server = async () => {
  await scrapeAllCompaniesInitialData();

  const app = express();
  const port = 3001;

  app.get("/data", async (req, res) => {
    const allCompaniesData = await readAllCompaniesData(prisma);
    res.json(allCompaniesData);
  });

  app.get("/profile", async (req, res) => {
    const symbol = req.query.symbol.toString();
    const companyProfile = await readCompanyProfile(prisma, symbol);
    res.json(companyProfile);
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

server();

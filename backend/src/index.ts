import express from "express";
import { allCompaniesDataExample } from "./scrapFunctions/scrapAllCompaniesData/allCompaniesDataExample";
import { scrapCompanyInitialData } from "./scrapFunctions/scrapCompanyInitialData/scrapCompanyInitialData";

const server = async () => {
  // const allCompaniesData = await scrapAllCompaniesData();

  const allCompaniesData = allCompaniesDataExample;

  const example = await scrapCompanyInitialData({
    endpoint: "PL11BTS00015",
    name: "11BIT",
  });

  const app = express();
  const port = 3001;
  app.get("/data", (req, res) => {
    res.json(allCompaniesData);
  });

  app.get("/example", (req, res) => {
    res.json(example);
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

server();

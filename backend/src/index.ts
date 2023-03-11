import express from "express";
import allCompaniesData from "./scrapAllCompaniesData/exampleData.json";
// import { scrapAllCompaniesData } from "./scrapAllCompaniesData/scrapAllCompaniesData";

const server = async () => {
  // const allCompaniesData = await scrapAllCompaniesData();
  const app = express();
  const port = 3000;
  app.get("/data", (req, res) => {
    res.json(allCompaniesData);
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

server();

import { scrapAllCompaniesData } from "./scrapAllCompaniesData/scrapAllCompaniesData";

const app = async () => {
  console.log("hello world 🤖");
  const data = await scrapAllCompaniesData();
  console.log(data);
};

app();

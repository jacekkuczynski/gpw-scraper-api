import { scrapCompanyInitialData } from "../scrapCompanyInitialData/scrapCompanyInitialData";

export const scrapAllCompaniesInitialData = async (
  allCompaniesData: {
    name: string;
    symbol: string;
    endpoint: string;
  }[]
) => {
  const allProfileData = [];
  let iteration = 1;
  const scrap = async () => {
    for (const company of allCompaniesData) {
      const endpoint = company.endpoint;
      const name = company.name;

      console.log(iteration, "/", allCompaniesData.length);
      iteration++;
      const profileData = await scrapCompanyInitialData({
        endpoint,
        name,
      });
      allProfileData.push(profileData);
      console.log(allProfileData);
    }
  };
  await scrap();

  return allProfileData;
};

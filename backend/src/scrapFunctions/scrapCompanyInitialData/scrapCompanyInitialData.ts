import { scrapCompanyProfile } from "./scrapCompanyProfile/scrapCompanyProfile";
import { scrapCompanyShareholders } from "./scrapCompanyShareholders/scrapCompanyShareholders";

export const scrapCompanyInitialData = async ({ endpoint, name }) => {
  const companyProfile = await scrapCompanyProfile({ endpoint });
  const companyShareholders = await scrapCompanyShareholders({ endpoint });
  return { [name]: { companyProfile, companyShareholders } };
};

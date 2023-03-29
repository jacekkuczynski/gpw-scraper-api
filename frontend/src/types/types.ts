export type SingleCompanyStartingData = {
  name: string;
  symbol: string;
  endpoint: string;
  companyIndex?: number;
};

export interface CompanyProfileI {
  id: number;
  listedSince: string;
  numberOfStocks: string;
  marketValue: string;
  name: string;
  symbol: string;
  adress: string;
  district: string;
  ceoName: string;
  website: string;
  description: string;
  shareholders: string;
}

export interface ShareholderI {
  name: string;
  stockAmount: string;
  stockPercentage: number;
}

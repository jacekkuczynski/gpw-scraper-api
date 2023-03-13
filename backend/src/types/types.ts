//  marketValue in milions pln

export interface SingleCompanyProfileI {
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
  shareholders: Shareholder[];
}

export interface Shareholder {
  name: string;
  stockAmount: string;
  stockPercentage: number;
}

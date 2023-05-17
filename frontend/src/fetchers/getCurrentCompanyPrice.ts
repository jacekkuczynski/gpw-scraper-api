import axios from "axios";

export const getCurrentCompanyPrice = async ({ queryKey }: any) => {
  const [_, symbol] = queryKey;
  const serverAdress = process.env.NEXT_PUBLIC_SERVER_ADRESS;
  const url = `${serverAdress}/price?symbol=${symbol}&period=1`;
  const data: {
    date: string;
    price: number;
  }[] = await axios.get(url).then((res) => {
    return res.data;
  });

  const price = data[0].price;

  return price;
};

import axios from "axios";

export const getChartData = async ({ queryKey }: any) => {
  const [_, symbol] = queryKey;
  const serverAdress = process.env.NEXT_PUBLIC_SERVER_ADRESS;
  const url = `${serverAdress}/price?symbol=${symbol}&period=30`;
  const data: {
    date: string;
    price: number;
  }[] = await axios.get(url).then((res) => {
    return res.data;
  });

  return data;
};

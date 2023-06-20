import axios from "axios";

export const getMultipleCompaniesPrice = async ({ queryKey }: any) => {
  try {
    const [_, symbols] = queryKey;
    const serverAdress = process.env.NEXT_PUBLIC_SERVER_ADRESS;
    const url = `${serverAdress}/multiplePrice?symbols=${symbols}`;
    const data: DataT = await axios.get(url).then((res) => {
      return res.data;
    });

    const parsedData: ParsedDataT = data.map((el) => {
      return { symbol: el.symbol, value: el.value };
    });

    return parsedData;
  } catch (error) {
    console.log(error);
  }
};

type DataT = {
  id: number;
  symbol: string;
  time: string;
  value: number;
}[];

type ParsedDataT = {
  symbol: string;
  value: number;
}[];

import { getMultipleCompaniesPrice } from "@/fetchers/getMultipleCompaniesPrice";
import { WalletItemT } from "@/store/store";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export const useGetCurrentWalletValue = (items: WalletItemT[]) => {
  const [walletValue, setWalletValue] = useState(0);
  const allSymbols = items.map((item) => item.symbol);
  const symbols = [...new Set(allSymbols)].join(",");
  const { data } = useQuery(
    [`multipleCompaniesPrice${symbols}`, symbols],
    getMultipleCompaniesPrice
  );

  useEffect(() => {
    if (data) {
      const totalSum = items.reduce((sum, item1) => {
        const matchingItem = data.find(
          (item2) => item2.symbol === item1.symbol
        );
        return sum + (matchingItem ? item1.stockCount * matchingItem.value : 0);
      }, 0);

      setWalletValue(totalSum);
    }
  }, [data, items]);

  return walletValue;
};

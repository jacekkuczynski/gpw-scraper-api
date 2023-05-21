import { getCurrentCompanyPrice } from "@/fetchers/getCurrentCompanyPrice";
import { useAppStore } from "@/store/store";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

export const useDialogAddToWallet = ({
  symbol,
  name,
}: {
  symbol: string;
  name: string;
}) => {
  const [walletName, setWalletName] = useState(crypto.randomUUID());
  const [stockCount, setStockCount] = useState(0);

  const { data } = useQuery(["companyPrice", symbol], getCurrentCompanyPrice);

  const isAddToWalletDialogOpen = useAppStore(
    (state) => state.isAddToWalletDialogOpen
  );
  const changeAddToWalletDialogVisibility = useAppStore(
    (state) => state.changeAddToWalletDialogVisibility
  );

  const addWalletItem = useAppStore((state) => state.addWalletItem);

  const handleWalletNameChange = (name: string) => {
    setWalletName(name);
  };

  const handleStockCountInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStockCount(parseInt(e.target.value));
  };

  const handleAddWalletItem = () => {
    if (data) {
      addWalletItem({
        stockCount,
        walletName,
        stockName: name,
        openDate: new Date(),
        openPrice: data,
        symbol,
      });
      toast.success(
        `Do portfela o nazwie ${walletName} dodano ${stockCount} akcji ${name} (${symbol})  po cenie ${data} za sztukę. Łączna wartość transakcji: ${
          stockCount * data
        }`,
        {
          duration: 3000,
          id: "watchlist_error",
        }
      );
      changeAddToWalletDialogVisibility(false);
    }
  };

  return {
    isAddToWalletDialogOpen,
    changeAddToWalletDialogVisibility,
    data,
    handleWalletNameChange,
    walletName,
    handleStockCountInputChange,
    stockCount,
    handleAddWalletItem,
  };
};

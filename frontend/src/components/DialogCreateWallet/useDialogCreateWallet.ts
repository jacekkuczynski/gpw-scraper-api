import { useAppStore } from "@/store/store";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const useDialogCreateWallet = () => {
  const [walletName, setWalletName] = useState(crypto.randomUUID());

  const isDialogOpen = useAppStore((state) => state.isCreateWalletDialogOpen);
  const changeCreateWalletDialogVisibility = useAppStore(
    (state) => state.changeCreateWalletDialogVisibility
  );
  const createWallet = useAppStore((state) => state.createWallet);

  useEffect(() => {}, []);

  const handleCreateWallet = () => {
    createWallet({
      name: walletName,
      items: [],
      createdAt: new Date(),
    });
    changeCreateWalletDialogVisibility(false);
    setWalletName(crypto.randomUUID());
    toast.success(`Portfel o nazwie ${walletName} został utworzony`, {
      duration: 3000,
      id: "watchlist_error",
    });
  };

  const handleWalletNameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWalletName(e.target.value);
  };

  return {
    isDialogOpen,
    changeCreateWalletDialogVisibility,
    walletName,
    handleWalletNameInputChange,
    handleCreateWallet,
  };
};

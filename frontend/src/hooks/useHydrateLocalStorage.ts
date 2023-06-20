import { useEffect } from "react";
import { useAppStore } from "../store/store";

export const useHydrateLocalStorage = () => {
  useEffect(() => {
    useAppStore.persist.rehydrate();
  }, []);
};

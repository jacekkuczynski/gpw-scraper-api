import { useAppStore } from "@/store/store";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const useProfileControlButtons = ({
  name,
  symbol,
}: {
  name: string;
  symbol: string;
}) => {
  const addToWatchlist = useAppStore((state) => state.addToWatchlist);
  const removeFromWatchlist = useAppStore((state) => state.removeFromWatchlist);
  const watchlist = useAppStore((state) => state.watchlist);

  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    if (
      watchlist.find((el) => {
        return el.name === name;
      })
    )
      setIsInWatchlist(true);
  }, [watchlist, name]);

  const handleAddToWatchlist = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    toast.success(`${name} (${symbol}) została dodana do listy obserwowanych`, {
      duration: 3000,
      id: "watchlist_error",
    });
    addToWatchlist({ name, symbol });
  };

  const handleRemoveFromWatchlist = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    toast(`${name} (${symbol}) usunięta z listy obserwowanych`, {
      duration: 3000,
      id: "watchlist_succes",
      icon: "🗑️",
    });

    removeFromWatchlist(symbol);
    setIsInWatchlist(false);
  };

  return { isInWatchlist, handleRemoveFromWatchlist, handleAddToWatchlist };
};

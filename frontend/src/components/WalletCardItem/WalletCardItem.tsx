import React from "react";
import * as HoverCard from "@radix-ui/react-hover-card";
import { formatCompanyName, parsePriceToLocaleString } from "@/helpers";
import { WalletItemT } from "@/store/store";
import styles from "./WalletCardItem.module.css";
import { useGetCurrentCompanyPrice } from "@/hooks/useGetCurrentCompanyPrice";

const WalletCardItem = ({ item }: { item: WalletItemT }) => {
  const currentPrice = useGetCurrentCompanyPrice(item.symbol);
  const openingValue = item.openPrice * item.stockCount;
  const currentValue = currentPrice * item.stockCount;
  const profitPercents = ((currentValue - openingValue) / openingValue) * 100;
  const profitValue = currentValue - openingValue;
  const parsedOpenDate = new Date(item.openDate).toLocaleDateString("pl-PL");

  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <div className={styles.HoverCardTrigger}>
          {item.symbol} {parsedOpenDate}
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content className={styles.HoverCardContent}>
          <div className={styles.walletCardItem}>
            <div>nazwa: {formatCompanyName(item.stockName)}</div>
            <div>data otwarcia: {parsedOpenDate}</div>
            <div>cena otwarcia: {parsePriceToLocaleString(item.openPrice)}</div>
            <div>obecna cena: {parsePriceToLocaleString(currentPrice)}</div>
            <div>ilość: {item.stockCount}</div>
            <div>
              wartość otwarcia: {parsePriceToLocaleString(openingValue)}
            </div>
            <div>obecna wartość: {parsePriceToLocaleString(currentValue)}</div>
            <div>zmiana: {profitPercents.toFixed(2)} %</div>`
            <div>zysk: {parsePriceToLocaleString(profitValue)}</div>
          </div>
          <HoverCard.Arrow className={styles.HoverCardArrow} />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export default WalletCardItem;

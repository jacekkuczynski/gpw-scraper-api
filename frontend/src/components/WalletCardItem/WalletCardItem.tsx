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

  return (
    <div key={item.stockName + item.openDate} className={styles.walletCardItem}>
      <div>nazwa: {formatCompanyName(item.stockName)}</div>
      <div>data otwarcia: {new Date(item.openDate).toDateString()}</div>
      <div>cena otwarcia: {parsePriceToLocaleString(item.openPrice)}</div>
      <div>obecna cena: {currentPrice}</div>
      <div>ilość: {item.stockCount}</div>
      <div>wartość otwarcia: {parsePriceToLocaleString(openingValue)}</div>
      <div>obecna wartość: {parsePriceToLocaleString(currentValue)}</div>
      <div>zmiana: {profitPercents} %</div>
      <div>zysk: {parsePriceToLocaleString(profitValue)}</div>
    </div>
  );
};

export default WalletCardItem;

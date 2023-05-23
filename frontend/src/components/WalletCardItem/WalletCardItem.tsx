import { formatCompanyName } from "@/helpers";
import { WalletItemT } from "@/store/store";
import CurrentCompanyPrice from "../CurrentCompanyPrice/CurrentCompanyPrice";

const WalletCardItem = ({ item }: { item: WalletItemT }) => {
  return (
    <div
      key={item.stockName + item.openDate}
      // className={styles.walletItem}
    >
      <div>stockName: {formatCompanyName(item.stockName)}</div>
      <div>openDate: {new Date(item.openDate).toDateString()}</div>
      <div>openPrice: {item.openPrice}</div>
      <div>
        currentPrice: <CurrentCompanyPrice symbol={item.symbol} />
      </div>

      <div>stockCount: {item.stockCount}</div>
      <div>
        openValue: {(item.openPrice * item.stockCount).toFixed(2)}
        PLN
      </div>
    </div>
  );
};

export default WalletCardItem;

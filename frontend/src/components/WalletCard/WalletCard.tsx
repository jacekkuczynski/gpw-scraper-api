import { WalletItemT } from "@/store/store";
import styles from "./WalletCard.module.css";
import { formatCompanyName, parsePriceToLocaleString } from "@/helpers";
import CurrentCompanyPrice from "../CurrentCompanyPrice/CurrentCompanyPrice";
import CurrentWalletValue from "../CurrentWalletValue/CurrentWalletValue";

const WalletCard = ({
  name,
  items,
  createdAt,
}: {
  name: string;
  items: WalletItemT[];
  createdAt: Date;
}) => {
  const investedSum = items
    .map((company) => company.openPrice * company.stockCount)
    .reduce((acc, val) => acc + val, 0);

  return (
    <div className={styles.walletCard}>
      <div>nazwa: {name}</div>
      <div>data utworzenia: {new Date(createdAt).toDateString()}</div>
      <div>zainwestowano : {parsePriceToLocaleString(investedSum)}</div>
      <div>obecna wartość : {<CurrentWalletValue items={items} />}</div>
      <div>
        {items?.map((company) => {
          return (
            <div
              key={company.stockName + company.openDate}
              className={styles.walletItem}
            >
              <div>stockName: {formatCompanyName(company.stockName)}</div>
              <div>openDate: {new Date(company.openDate).toDateString()}</div>
              <div>openPrice: {company.openPrice}</div>
              <div>
                currentPrice: <CurrentCompanyPrice symbol={company.symbol} />
              </div>

              <div>stockCount: {company.stockCount}</div>
              <div>
                openValue: {(company.openPrice * company.stockCount).toFixed(2)}
                PLN
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WalletCard;

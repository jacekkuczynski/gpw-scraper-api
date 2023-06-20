import { WalletItemT } from "@/store/store";
import styles from "./WalletCard.module.css";
import { parsePriceToLocaleString } from "@/helpers";
import WalletCardItem from "../WalletCardItem/WalletCardItem";
import { useGetCurrentWalletValue } from "@/hooks/useGetCurrentWalletValue";

const WalletCard = ({
  name,
  items,
  createdAt,
}: {
  name: string;
  items: WalletItemT[];
  createdAt: Date;
}) => {
  const currentWalletValue = useGetCurrentWalletValue(items);
  const investedSum = items
    .map((company) => company.openPrice * company.stockCount)
    .reduce((acc, val) => acc + val, 0);

  const profitPercents =
    ((currentWalletValue - investedSum) / investedSum) * 100;

  const profitValue = currentWalletValue - investedSum;

  return (
    <div className={styles.walletCard}>
      <div>nazwa: {name}</div>
      <div>
        data utworzenia: {new Date(createdAt).toLocaleDateString("pl-PL")}
      </div>
      <div>zainwestowano : {parsePriceToLocaleString(investedSum)}</div>
      <div>obecna wartość : {parsePriceToLocaleString(currentWalletValue)}</div>
      <div>
        zysk/strata: {isNaN(profitPercents) ? "n/d" : profitPercents.toFixed(2)}{" "}
        %
      </div>
      <div>zysk: {parsePriceToLocaleString(profitValue)}</div>
      <div>
        Portfel składa się z:
        {items?.map((company) => (
          <WalletCardItem
            key={company.symbol + company.openDate}
            item={company}
          />
        ))}
      </div>
    </div>
  );
};

export default WalletCard;

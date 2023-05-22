import { WalletItemT } from "@/store/store";
import styles from "./WalletCard.module.css";

const WalletCard = ({
  name,
  items,
  createdAt,
}: {
  name: string;
  items: WalletItemT[];
  createdAt: Date;
}) => {
  console.log({ items });

  return (
    <div className={styles.walletCard}>
      <div>{name}</div>
      <div>{new Date(createdAt).toDateString()}</div>
      <div>{items?.map((company) => company.stockName)}</div>
    </div>
  );
};

export default WalletCard;

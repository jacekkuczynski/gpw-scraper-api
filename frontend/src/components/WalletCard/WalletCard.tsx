import { WalletItemT } from "@/store/store";

const WalletCard = ({
  name,
  items,
  createdAt,
}: {
  name: string;
  items: WalletItemT[];
  createdAt: Date;
}) => {
  return (
    <>
      <div>{name}</div>
      <div>{new Date(createdAt).toDateString()}</div>
    </>
  );
};

export default WalletCard;

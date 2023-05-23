import { getCurrentCompanyPrice } from "@/fetchers/getCurrentCompanyPrice";
import { WalletItemT } from "@/store/store";
import { useQuery } from "react-query";

const CurrentWalletValue = (items: WalletItemT) => {
  const { data } = useQuery(["companyPrice", [symbol]], getCurrentCompanyPrice);

  return <div>Enter</div>;
};

export default CurrentWalletValue;

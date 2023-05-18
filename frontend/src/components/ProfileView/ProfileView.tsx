import { CompanyProfileI, ShareholderI } from "@/types/types";
import Link from "next/link";
import styles from "./ProfileView.module.css";
import CurrentCompanyPrice from "../CurrentCompanyPrice/CurrentCompanyPrice";
import MarketValue from "../MarketValue/MarketValue";
import ShareholdersAccordion from "../ShareholdersAccordion/ShareholdersAccordion";

const ProfileView = ({ profile }: { profile: CompanyProfileI }) => {
  return (
    <div className={styles.profileView}>
      <div className={styles.titleContainer}>
        <div className={styles.name}>{profile.name}</div>
        <CurrentCompanyPrice symbol={profile.symbol} />
        <div className={styles.description}>{profile.description}</div>
        <Link
          href={`//${profile.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {profile.website}
        </Link>
      </div>
      <hr className={styles.separator} />
      <div className={styles.data}>
        <div>na giełdzie od: {profile.listedSince}</div>
        <div>liczba akcji (tys):{parseInt(profile.numberOfStocks) / 1000}</div>
        <MarketValue
          numberOfStocks={profile.numberOfStocks}
          symbol={profile.symbol}
        />
      </div>
      <hr className={styles.separator} />

      <div className={styles.shareholdersContainer}>
        <p>Nawięksi akcjonariusze:</p>
        <ShareholdersAccordion shareholders={profile.shareholders} />
      </div>
      <hr className={styles.separator} />
    </div>
  );
};

export default ProfileView;

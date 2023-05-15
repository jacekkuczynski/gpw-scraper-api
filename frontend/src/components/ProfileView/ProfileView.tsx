import { ShareholderI } from "@/types/types";
import Link from "next/link";
import styles from "./ProfileView.module.css";

const ProfileView = ({ profile }: { profile: any }) => {
  return (
    <>
      <div className={styles.titleContainer}>
        <div className={styles.name}>{profile.name}</div>
        <div className={styles.description}>{profile.description}</div>

        {/* component 1 */}
        <Link
          href={`//${profile.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {profile.website}
        </Link>
      </div>
      {/* <Separator.Root className={styles.separator} /> */}
      <div className={styles.data}>
        <div>listed since: {profile.listedSince}</div>
        <div>number of stocks {profile.numberOfStocks}</div>
        <div>market value {profile.marketValue} mln PLN</div>
      </div>
      {/* <Separator.Root className={styles.separator} /> */}
      {/* component 2 */}
      <p>Nawięksi akcjonariusze:</p>
      <div className={styles.shareholdersContainer}>
        {JSON.parse(profile.shareholders).map((shareholder: ShareholderI) => {
          return (
            <div key={shareholder.name}>
              <div className={styles.shareholderTitle}>{shareholder.name}</div>
              <div>liczba akcji: {shareholder.stockAmount}</div>
              <div>
                procent wszystkich akcji: {shareholder.stockPercentage}%
              </div>
            </div>
          );
        })}
      </div>
      {/* <Separator.Root className={styles.separator} /> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      ></div>
    </>
  );
};

export default ProfileView;

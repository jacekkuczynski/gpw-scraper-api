"use client";

import { getCompanyProfile } from "@/fetchers/getCompanyProfile";
import { ShareholderI } from "@/types/types";
import * as Separator from "@radix-ui/react-separator";
import Link from "next/link";
import { useQuery } from "react-query";
import ProfileControlButtons from "../ProfileControlButtons/ProfileControlButtons";
import styles from "./ProfileView.module.css";

const ProfileView = ({ symbol }: { symbol: string }) => {
  const { data, isLoading } = useQuery(
    ["companyProfile", { symbol }],
    getCompanyProfile
  );

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div>loading</div>
      </div>
    );
  }
  return data ? (
    <div className={styles.profileView}>
      <div className={styles.titleContainer}>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.description}>{data.description}</div>
        <Link
          href={`//${data.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {data.website}
        </Link>
      </div>
      <Separator.Root className={styles.separator} />
      <div className={styles.data}>
        <div>listed since: {data.listedSince}</div>
        <div>number of stocks {data.numberOfStocks}</div>
        <div>market value {data.marketValue} mln PLN</div>
      </div>
      <Separator.Root className={styles.separator} />
      <p>Nawięksi akcjonariusze:</p>
      <div className={styles.shareholdersContainer}>
        {JSON.parse(data.shareholders).map((shareholder: ShareholderI) => {
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
      <Separator.Root className={styles.separator} />
      <ProfileControlButtons name={data.name} symbol={data.symbol} />
    </div>
  ) : null;
};

export default ProfileView;

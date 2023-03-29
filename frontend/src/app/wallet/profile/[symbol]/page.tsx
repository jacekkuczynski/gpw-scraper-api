"use client";

// // import { getCompanyProfile } from "@/fetchers/getCompanyProfile";
// import { CompanyProfileI } from "@/types/types";
// import { useEffect, useState } from "react";
// import styles from "./page.module.css";

// export const dynamicParams = false;

// export async function generateStaticParams() {
//   const allCompaniesData = await getAllCompaniesData();

//   return allCompaniesData.map((company) => {
//     const symbol = company.symbol;
//     return { symbol };
//   });
// }

export default function Home({ params }: { params: { symbol: string } }) {
  // const [profile, setProfile] = useState<CompanyProfileI | null>(null);
  // const { symbol } = params;
  // useEffect(() => {
  //   getCompanyProfile(symbol).then((res) => {
  //     setProfile(res);
  //   });
  // }, [symbol]);
  // {
  //   return profile ? (
  //     <div className={styles.profileContainer}>
  //       <b>siema {symbol}</b>
  //       <div>name {profile.name}</div>
  //       <div>{profile.description}</div>
  //       <div>listed since: {profile.listedSince}</div>
  //       <div>number of stocks {profile.numberOfStocks}</div>
  //       <div>market value {parseFloat(profile.marketValue) * 1000000} PLN</div>
  //       <div>
  //         <a
  //           href={`//${profile.website}`}
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           {profile.website}
  //         </a>
  //       </div>
  //       <div>shareholders {profile.shareholders}</div>
  //     </div>
  //   ) : (
  //     <div className={styles.profileContainer}>loading</div>
  //   );
  // }

  return <div>{params.symbol}</div>;
}

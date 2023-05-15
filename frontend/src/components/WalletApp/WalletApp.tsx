"use client";

import CompaniesScrollArea from "../CompaniesScrollArea/CompaniesScrollArea";
import NavMenu from "../NavMenu/NavMenu";
import styles from "./WalletApp.module.css";

const WalletApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="app">
      {/* {!userActive ? <Loader /> : null} */}
      <NavMenu />
      <CompaniesScrollArea />
      <div className={styles.container}> {children}</div>
    </div>
  );
};

export default WalletApp;

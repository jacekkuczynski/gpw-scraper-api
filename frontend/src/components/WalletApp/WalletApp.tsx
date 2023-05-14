"use client";

import { useLoadScreen } from "@/hooks/useLoadScreen";
import CompaniesScrollArea from "../CompaniesScrollArea/CompaniesScrollArea";
import Loader from "../Loader/Loader";
import NavMenu from "../NavMenu/NavMenu";
import styles from "./WalletApp.module.css";

const WalletApp = ({ children }: { children: React.ReactNode }) => {
  // const { userActive } = useLoadScreen();

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

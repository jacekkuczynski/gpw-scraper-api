import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loaderTextContainer}>
        <h2 className={styles.loaderText}>
          Polish Stock Exchange Virtual Wallet
        </h2>
        <p>in development</p>
      </div>
    </div>
  );
};

export default Loader;

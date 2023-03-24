import { useState, useCallback, ChangeEvent, useEffect } from "react";
import styles from "./Searchbox.module.css";

const Searchbox = ({ onSearchboxChange }: { onSearchboxChange: Function }) => {
  const [input, setInput] = useState("");

  const handleSearchInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
    },
    []
  );

  useEffect(() => {
    onSearchboxChange(input);
  });

  return (
    <div className={styles.Info}>
      <div className={styles.ScrollTitle}>Spółki notowane na GPW:</div>
      <div className={styles.SearchInput}>
        <label htmlFor="search-input">wyszukaj</label>
        <input
          onChange={handleSearchInputChange}
          type="text"
          name="search-input"
          className={styles.Input}
        />
      </div>
    </div>
  );
};

export default Searchbox;

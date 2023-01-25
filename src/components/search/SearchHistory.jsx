import React, { useContext } from "react";
import styles from "../../styles/pages/search/search.module.css";
import { searchContext } from "../../context/searchContext";
import { VscHistory } from "react-icons/vsc";

export const SearchHistory = () => {
  const {
    searchHistory,
    setSearchHistory,
    setSearchParam,
    showFilter,
    setShowFilter,
  } = useContext(searchContext);

  const handleHistorySearch = (param) => {
    let params = new URLSearchParams({
      type: "public",
      app_id: "5aaef2eb",
      app_key: "9902dffadf146efce27479ecd942b16e",
    });

    params.append("q", param);

    setSearchParam(params.toString());
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div className={styles.searchHistory}>
      {searchHistory.length > 0 && (
        <div className={styles.header}>
          <VscHistory className={styles.icon} />
          <p onClick={handleClearHistory}>Clear All</p>
        </div>
      )}

      <div className={styles.historyItems}>
        {searchHistory.map((item, index) => (
          <p
            onClick={() => {
              handleHistorySearch(item);
              setShowFilter(!showFilter);
            }}
            key={index}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

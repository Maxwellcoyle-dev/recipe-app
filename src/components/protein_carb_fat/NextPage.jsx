import React from "react";
import styles from "../../styles/nextPageComponent/nextPage.module.css";

export const NextPage = ({ refetchNextPage }) => {
  return (
    <div className={styles.nextPageDiv}>
      <button onClick={refetchNextPage}>Load More</button>
    </div>
  );
};

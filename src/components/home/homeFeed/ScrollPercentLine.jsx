import React from "react";
import styles from "../../../styles/pages/home/home.module.css";

export const ScrollPercentLine = ({ scrollPercent }) => {
  return (
    <hr
      className={styles.percentLine}
      style={{
        width: `${scrollPercent}%`,
        transition: ".75s",
      }}
    ></hr>
  );
};

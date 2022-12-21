import React from "react";
import styles from "../../styles/statusComponents/statusComponents.module.css";
import error from "../../images/error.svg";

export const Error = () => {
  return (
    <div className={styles.errorContainer}>
      <img src={error} />
      <p>Error</p>
    </div>
  );
};

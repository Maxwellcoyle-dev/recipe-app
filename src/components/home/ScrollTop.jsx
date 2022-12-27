import React from "react";
import styles from "../../styles/pages/home/home.module.css";
import { BiArrowToTop } from "react-icons/bi";

export const ScrollTop = () => {
  const handleScrollToTop = () => {
    window.scroll({ top: 0, behavior: "smooth" });
  };
  return (
    <div className={styles.scrollTopDiv} onClick={handleScrollToTop}>
      <BiArrowToTop className={styles.scrollTopIcon} />
    </div>
  );
};

import React from "react";
import styles from "../../styles/pages/protein_carb_fat/pages.module.css";
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

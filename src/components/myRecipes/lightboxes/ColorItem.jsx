import React from "react";
import styles from "../../../styles/pages/myRecipes/myRecipes.module.css";

export const ColorItem = ({ color }) => {
  return (
    <div
      className={styles.colorItem}
      style={{ backgroundColor: color.hex }}
    ></div>
  );
};

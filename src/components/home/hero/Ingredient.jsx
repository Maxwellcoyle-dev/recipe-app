import React from "react";
import styles from "../../../styles/pages/home/home.module.css";

export const Ingredient = ({ ingredient }) => {
  return (
    <div className={styles.ingredientDiv}>
      <p>{ingredient}</p>
    </div>
  );
};

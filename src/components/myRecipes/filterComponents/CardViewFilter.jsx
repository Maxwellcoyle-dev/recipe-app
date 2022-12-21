import React, { useContext } from "react";
import styles from "../../../styles/pages/myRecipes/myRecipes.module.css";
import { myRecipesContext } from "../../../context/myRecipesContext";
import { CardFilterLabel } from "./CardFilterLabel";
import { IoFilter } from "react-icons/io5";

export const CardViewFilter = () => {
  const { labels, colors } = useContext(myRecipesContext);

  return (
    <div className={styles.cardViewFilter}>
      <IoFilter className={styles.filterIcon} />
      {labels?.map((label, index) => {
        return (
          <CardFilterLabel
            label={label}
            key={index}
            color={colors[index]}
            id={index}
          />
        );
      })}
    </div>
  );
};

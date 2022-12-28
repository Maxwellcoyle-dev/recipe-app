import React, { useContext } from "react";
import styles from "../../../styles/pages/myRecipes/myRecipes.module.css";
import { myRecipesContext } from "../../../context/myRecipesContext";
import { CardFilterLabel } from "./CardFilterLabel";
import { AiOutlineFilter } from "react-icons/ai";

export const CardViewFilter = () => {
  const { labels } = useContext(myRecipesContext);

  return (
    <div className={styles.cardViewFilter}>
      <AiOutlineFilter className={styles.filterIcon} />
      {labels?.map((label, index) => {
        return <CardFilterLabel label={label} key={index} id={index} />;
      })}
    </div>
  );
};

import React, { useContext } from "react";
import styles from "../../styles/pages/myRecipes/myRecipes.module.css";
import { searchContext } from "../../context/searchContext";
import { DirectoryItem } from "./DirectoryItem";

export const DirectoryPanel = () => {
  const { savedRecipes } = useContext(searchContext);

  return (
    <div className={styles.directoryPanel}>
      {savedRecipes?.map((item) => {
        return (
          <DirectoryItem
            recipe={item.recipe}
            labels={item.labels}
            key={item.id}
          />
        );
      })}
    </div>
  );
};

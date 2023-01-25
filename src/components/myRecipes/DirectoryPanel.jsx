import React, { useContext, useState, useEffect } from "react";
import styles from "../../styles/pages/myRecipes/myRecipes.module.css";
import { searchContext } from "../../context/searchContext";
import { myRecipesContext } from "../../context/myRecipesContext";
import { DirectoryItem } from "./DirectoryItem";

export const DirectoryPanel = () => {
  const { savedRecipes } = useContext(searchContext);
  const { labels, selectedLabel } = useContext(myRecipesContext);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    let newArray = [];
    savedRecipes?.map((item) => {
      const match = item.recipe.dishType.some(
        (label) => label === labels[selectedLabel]
      );
      if (match) {
        newArray.push(item);
      }
      return null;
    });
    return setFilteredRecipes(newArray);
  }, [selectedLabel, labels, savedRecipes]);

  return (
    <div className={styles.directoryPanel}>
      {filteredRecipes.length < 1
        ? savedRecipes?.map((item) => (
            <DirectoryItem
              recipe={item.recipe}
              labels={item.labels}
              key={item.id}
              id={item.id}
              showNoteBox={item.showNoteBox}
              note={item.note}
            />
          ))
        : filteredRecipes?.map((item) => (
            <DirectoryItem
              recipe={item.recipe}
              labels={item.labels}
              key={item.id}
              id={item.id}
              showNoteBox={item.showNoteBox}
              note={item.note}
            />
          ))}
    </div>
  );
};

import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/pages/myRecipes/myRecipes.module.css";
import { myRecipesContext } from "../../context/myRecipesContext";
import { searchContext } from "../../context/searchContext";
import { RecipeCard } from "./RecipeCard";

export const CardViewPanel = () => {
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
    <div className={styles.cardViewPanel}>
      {filteredRecipes.length < 1
        ? savedRecipes?.map((item) => (
            <RecipeCard
              recipe={item.recipe}
              id={item.id}
              showNoteBox={item.showNoteBox}
              note={item.note}
              key={item.id}
            />
          ))
        : filteredRecipes?.map((item) => (
            <RecipeCard
              recipe={item.recipe}
              id={item.id}
              showNoteBox={item.showNoteBox}
              note={item.note}
              key={item.id}
            />
          ))}
    </div>
  );
};

import React, { useContext } from "react";
import styles from "../../styles/pages/myRecipes/myRecipes.module.css";
import { searchContext } from "../../context/searchContext";
import { appContext } from "../../context/appContext";
import { SaveRecipeIcon } from "./IconComponents/SaveRecipeIcon";
import { RecipeNoteIcon } from "./IconComponents/RecipeNoteIcon";

export const DirectoryItem = ({ recipe, id, showNoteBox, note }) => {
  const { setShowRecipeView, setRecipeItem } = useContext(appContext);
  const { savedRecipes } = useContext(searchContext);

  const handleShowRecipeClick = () => {
    setShowRecipeView(true);
    setRecipeItem(recipe);
  };

  let found = savedRecipes?.some((item) => item.recipe.label === recipe.label);
  return (
    <div className={styles.directoryItem}>
      <div className={styles.labelDiv}>
        <h3 onClick={handleShowRecipeClick}>{recipe?.label}</h3>
      </div>

      <div className={styles.iconContainer}>
        <RecipeNoteIcon id={id} showNoteBox={showNoteBox} note={note} />
        <SaveRecipeIcon recipe={recipe} found={found} />
      </div>
    </div>
  );
};

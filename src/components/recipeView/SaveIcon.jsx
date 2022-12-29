import React, { useContext } from "react";
import styles from "../../styles/recipeView/recipeView.module.css";
import { searchContext } from "../../context/searchContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export const SaveIcon = ({ recipe }) => {
  const { savedRecipes, savedRecipesDispatch } = useContext(searchContext);

  let found = savedRecipes?.some((item) => item.recipe.label === recipe.label);

  return found ? (
    <div
      className={styles.saveIconDiv}
      onClick={() => {
        savedRecipesDispatch({
          type: "delete-recipe",
          label: recipe.label,
        });
      }}
    >
      <AiFillHeart className={styles.deleteRecipeIcon} />
    </div>
  ) : (
    <div
      className={styles.saveIconDiv}
      onClick={() => {
        savedRecipesDispatch({
          type: "save-recipe",
          recipe: recipe,
        });
      }}
    >
      <AiOutlineHeart className={styles.saveRecipeIcon} />
    </div>
  );
};

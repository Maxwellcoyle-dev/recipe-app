import React, { useContext } from "react";
import styles from "../../../styles/pages/myRecipes/myRecipes.module.css";
import { searchContext } from "../../../context/searchContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export const SaveRecipeIcon = ({ recipe, found }) => {
  const { savedRecipesDispatch } = useContext(searchContext);

  return (
    <>
      {found ? (
        <div
          className={styles.iconDiv}
          onClick={() => {
            savedRecipesDispatch({
              type: "delete-recipe",
              label: recipe.label,
            });
          }}
        >
          <AiFillHeart className={styles.iconSelected} />
        </div>
      ) : (
        <div
          className={styles.iconDiv}
          onClick={() => {
            savedRecipesDispatch({
              type: "save-recipe",
              recipe: recipe,
            });
          }}
        >
          <AiOutlineHeart className={styles.iconInitial} />
        </div>
      )}
    </>
  );
};

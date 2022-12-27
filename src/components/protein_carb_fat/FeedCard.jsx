import React, { useContext } from "react";
import styles from "../../styles/pages/protein_carb_fat/pages.module.css";
import { appContext } from "../../context/appContext";
import { SaveIcon } from "./SaveIcon";
import { BsCardChecklist, BsClockHistory } from "react-icons/bs";
import { searchContext } from "../../context/searchContext";

export const FeedCard = ({ recipe }) => {
  const { setShowRecipeView, setRecipeItem } = useContext(appContext);
  const { savedRecipes } = useContext(searchContext);

  const handleShowRecipeClick = () => {
    setShowRecipeView(true);
    setRecipeItem(recipe);
  };

  let found = savedRecipes?.some((item) => item.recipe.label === recipe.label);

  return (
    <div className={styles.recipeCard}>
      <SaveIcon recipe={recipe} label={recipe.label} found={found} />

      <div
        className={styles.cardImageDiv}
        style={{ backgroundImage: `url(${recipe.image})` }}
      >
        <button onClick={handleShowRecipeClick}>See Recipe</button>
      </div>
      <div className={styles.recipeInfoContainer}>
        {recipe.totalTime !== 0 && (
          <div className={styles.timeDiv}>
            <BsClockHistory className={styles.icon} />
            <p>{recipe.totalTime} Mins</p>
          </div>
        )}
        <div className={styles.ingredientDiv}>
          <BsCardChecklist className={styles.icon} />
          <p>{recipe?.ingredientLines?.length} Ingredients</p>
        </div>
      </div>
      <div className={styles.titleDiv}>
        <h3 onClick={handleShowRecipeClick}>{recipe?.label}</h3>
      </div>
    </div>
  );
};

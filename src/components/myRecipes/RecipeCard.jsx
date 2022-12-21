import React, { useContext } from "react";
import styles from "../../styles/pages/myRecipes/myRecipes.module.css";
import { searchContext } from "../../context/searchContext";
import { appContext } from "../../context/appContext";
import { SaveRecipeIcon } from "./IconComponents/SaveRecipeIcon";
import { RecipeNoteIcon } from "./IconComponents/RecipeNoteIcon";
import { BsClockHistory, BsCardChecklist } from "react-icons/bs";

export const RecipeCard = ({ recipe, id, showNoteBox, note }) => {
  const { setShowRecipeView, setRecipeItem } = useContext(appContext);
  const { savedRecipes } = useContext(searchContext);

  let found = savedRecipes?.some((item) => item.recipe.label === recipe.label);

  const handleShowRecipeClick = () => {
    setShowRecipeView(true);
    setRecipeItem(recipe);
  };

  return (
    <div className={styles.myRecipesCard}>
      <div className={styles.cardIconContainer}>
        <RecipeNoteIcon id={id} showNoteBox={showNoteBox} note={note} />
        <SaveRecipeIcon recipe={recipe} label={recipe.label} found={found} />
      </div>

      <div
        className={styles.cardImageDiv}
        style={{ backgroundImage: `url(${recipe.image})` }}
      >
        <button onClick={handleShowRecipeClick}>See Recipe</button>
      </div>
      <div className={styles.recipeInfoContainer}>
        <div className={styles.timeDiv}>
          <BsClockHistory className={styles.icon} />
          <p>{recipe.totalTime} Mins</p>
        </div>
        <div className={styles.ingredientDiv}>
          <BsCardChecklist className={styles.icon} />
          <p>{recipe?.ingredientLines?.length} Ingredients</p>
        </div>
      </div>
      <div className={styles.titleDiv}>
        <h3>{recipe?.label}</h3>
      </div>
    </div>
  );
};

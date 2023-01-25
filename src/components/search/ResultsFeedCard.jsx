import styles from "../../styles/pages/search/search.module.css";
import { BsCardChecklist, BsClockHistory } from "react-icons/bs";
import { SaveIcon } from "./SaveIcon";
import { useContext } from "react";
import { appContext } from "../../context/appContext";
import { searchContext } from "../../context/searchContext";

export const ResultsFeedCard = ({ recipe }) => {
  const { setShowRecipeView, setRecipeItem } = useContext(appContext);
  const { savedRecipes } = useContext(searchContext);

  let found = savedRecipes?.some((item) => item.recipe.label === recipe.label);

  const handleShowRecipeClick = () => {
    setShowRecipeView(true);
    setRecipeItem(recipe);
  };

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
            {recipe.totalTime >= 60 && (
              <p>{`${Math.floor(recipe.totalTime / 60)} hrs`}</p>
            )}
            <p>{`${recipe.totalTime % 60} mins`}</p>
          </div>
        )}
        <div className={styles.ingredientDiv}>
          <BsCardChecklist className={styles.icon} />
          <p>{recipe?.ingredientLines?.length} Ingredients</p>
        </div>
      </div>
      <div onClick={handleShowRecipeClick} className={styles.titleDiv}>
        <h3>{recipe?.label}</h3>
      </div>
    </div>
  );
};

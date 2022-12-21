import styles from "../../styles/pages/search/search.module.css";
import { BsCardChecklist, BsClockHistory } from "react-icons/bs";
import { useContext } from "react";
import { appContext } from "../../context/appContext";

export const ResultsFeedCard = ({ recipe }) => {
  const { setShowRecipeView, setRecipeItem } = useContext(appContext);

  const handleShowRecipeClick = () => {
    setShowRecipeView(true);
    setRecipeItem(recipe);
  };

  return (
    <div className={styles.resultsCard}>
      <div className={styles.resultsImageContainer}>
        <div
          className={styles.resultsCardBgImage}
          style={{ backgroundImage: `url(${recipe?.image})` }}
        >
          <div className={styles.resultsCardOverlay}>
            <div className={styles.timeDiv}>
              <BsClockHistory className={styles.icon} />
              <p>{recipe?.totalTime} Mins</p>
            </div>
            <div className={styles.ingredientDiv}>
              <BsCardChecklist className={styles.icon} />
              <p>{recipe?.ingredientLines?.length} Ingredients</p>
            </div>
          </div>
          <button onClick={handleShowRecipeClick}>See Recipe</button>
        </div>
      </div>
      <h3>{recipe?.label}</h3>
    </div>
  );
};

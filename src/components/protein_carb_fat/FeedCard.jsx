import React, { useContext } from "react";
import styles from "../../styles/pages/protein_carb_fat/pages.module.css";
import { appContext } from "../../context/appContext";
import { SaveIcon } from "../SaveIcon";
import { BsCardChecklist, BsClockHistory } from "react-icons/bs";

export const FeedCard = ({ recipe }) => {
  const { setShowRecipeView, setRecipeItem } = useContext(appContext);

  const handleShowRecipeClick = () => {
    setShowRecipeView(true);
    setRecipeItem(recipe);
  };

  return (
    <div className={styles.wrappingFeedCard}>
      <div className={styles.feedImageContainer}>
        <div
          className={styles.feedCardBgImage}
          style={{ backgroundImage: `url(${recipe?.image})` }}
        >
          <div className={styles.feedCardOverlay}>
            <SaveIcon recipe={recipe} />
            <div className={styles.timeDiv}>
              <BsClockHistory className={styles.icon} />
              <p>{recipe?.totalTime} Mins</p>
            </div>
            <div className={styles.ingredientDiv}>
              <BsCardChecklist className={styles.icon} />
              <p>{recipe?.ingredientLines.length} Ingredients</p>
            </div>
          </div>
          <button onClick={handleShowRecipeClick}>See Recipe</button>
        </div>
      </div>
      <h3>{recipe?.label}</h3>
    </div>
  );
};

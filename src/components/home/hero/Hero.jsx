import React, { useContext } from "react";
import styles from "../../../styles/pages/home/home.module.css";
import { appContext } from "../../../context/appContext";
import { HLine } from "../HLine";
import { Ingredient } from "./Ingredient";
import { SaveIcon } from "../../SaveIcon";
import { BsCardChecklist, BsClockHistory } from "react-icons/bs";

export const Hero = ({ recipe }) => {
  const { setShowRecipeView, setRecipeItem } = useContext(appContext);

  const handleShowRecipeClick = () => {
    setShowRecipeView(true);
    setRecipeItem(recipe);
  };
  return (
    <div className={styles.heroSlide}>
      <div className={styles.leftDiv}>
        <img
          alt={recipe.label}
          src={recipe.image}
          className={styles.recipeImage}
        />
        <button>See Recipe</button>
        <SaveIcon recipe={recipe} />
      </div>
      <div className={styles.rightDiv}>
        <h2>{recipe.label}</h2>
        <HLine />
        <div className={styles.rightInfoDiv}>
          <div className={styles.heroInfoSection}>
            <div>
              <BsClockHistory className={styles.icon} />
            </div>

            <p>{recipe.totalTime} mins</p>
          </div>
          <div className={styles.heroInfoSection}>
            <div>
              <BsCardChecklist className={styles.icon} />
            </div>

            <div className={styles.ingredientsContainer}>
              {recipe.ingredientLines.map((ingredient, index) => {
                if (index < 6) {
                  return <Ingredient key={index} ingredient={ingredient} />;
                } else if (index === 6) {
                  return (
                    <div
                      className={styles.seeRecipe}
                      onClick={handleShowRecipeClick}
                      key={index}
                    >
                      ... see full list
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useContext, useEffect } from "react";
import styles from "../../styles/recipeView/recipeView.module.css";
import { useScrollLock } from "../../hooks/useScrollLock";
import { AiOutlineClose } from "react-icons/ai";
import { SaveIcon } from "../SaveIcon";
import { appContext } from "../../context/appContext";
import { searchContext } from "../../context/searchContext";

export const RecipeView = () => {
  const { lockScroll, unlockScroll } = useScrollLock();
  const { savedRecipes, savedRecipesDispatch } = useContext(searchContext);
  const { setShowRecipeView, recipeItem } = useContext(appContext);

  useEffect(() => {
    lockScroll();

    return () => {
      unlockScroll();
    };
  });

  let found = savedRecipes?.some(
    (item) => item?.recipe?.label === recipeItem?.label
  );

  return (
    <div className={styles.recipeViewBackDrop}>
      <div className={styles.recipeViewCard}>
        <div className={styles.headerRow}>
          <div className={styles.headerContent}>
            <h2>{recipeItem?.label}</h2>
            <a href={recipeItem?.url}>
              <p>by {recipeItem?.source}</p>
            </a>
            <div className={styles.buttonDiv}>
              <button className={styles.primaryBtn}>See Full Recipe</button>
              {found ? (
                <button
                  className={styles.secondaryBtn}
                  onClick={() => {
                    savedRecipesDispatch({
                      type: "delete-recipe",
                      label: recipeItem?.label,
                    });
                  }}
                >
                  Remove from My Recipes
                </button>
              ) : (
                <button
                  className={styles.secondaryBtn}
                  onClick={() => {
                    savedRecipesDispatch({
                      type: "save-recipe",
                      recipe: recipeItem,
                    });
                  }}
                >
                  Add to My Recipes
                </button>
              )}
            </div>
          </div>
          <div className={styles.imgDiv}>
            <img alt={recipeItem?.label} src={recipeItem?.image} />
          </div>
        </div>
        <div className={styles.primaryInfoRow}>
          <div className={styles.overviewDiv}>
            <h3>Recipe Info</h3>
            <div className={styles.items}>
              <p>{recipeItem?.dishType}</p>
              <p>{recipeItem?.cuisineType}</p>
              <p>{Math.round(recipeItem?.calories)} calories</p>
            </div>
          </div>
          {recipeItem?.cautions?.length > 0 && (
            <div className={styles.overviewDiv}>
              <h3>Cautions</h3>
              <div className={styles.items}>
                {recipeItem?.cautions?.map((caution, index) => {
                  return (
                    <p key={index} style={{ borderColor: "red" }}>
                      {caution}
                    </p>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className={styles.infoDiv}>
          <h3>Ingredients</h3>
          <div className={styles.infoItems}>
            {recipeItem?.ingredientLines?.map((ingredient, index) => {
              return (
                <div key={index} className={styles.ingredientDiv}>
                  <p>{ingredient}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.infoDiv}>
          <h3>HealthLabels</h3>
          <div className={styles.infoItems}>
            {recipeItem?.healthLabels?.map((label, index) => {
              return (
                <div key={index} className={styles.ingredientDiv}>
                  <p>{label}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={styles.exitIconDiv}
          onClick={() => setShowRecipeView(false)}
        >
          <AiOutlineClose className={styles.exitIcon} />
        </div>
        <SaveIcon recipe={recipeItem} />
      </div>
    </div>
  );
};

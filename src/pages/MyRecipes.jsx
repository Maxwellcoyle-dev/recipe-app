import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/pages/myRecipes/myRecipes.module.css";
import { searchContext } from "../context/searchContext";
import { appContext } from "../context/appContext";
import { myRecipesContext } from "../context/myRecipesContext";
import { CardViewPanel } from "../components/myRecipes/CardViewPanel";
import { DirectoryPanel } from "../components/myRecipes/DirectoryPanel";
import { NoteLightBox } from "../components/myRecipes/lightboxes/NoteLightBox";
import { CardViewFilter } from "../components/myRecipes/filterComponents/CardViewFilter";
import { RecipeView } from "../components/recipeView/RecipeView";
import addRecipes from "../images/add-recipes.svg";

export const MyRecipes = () => {
  const [labels, setLabels] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState(null);

  const { savedRecipes } = useContext(searchContext);
  const { showRecipeView } = useContext(appContext);

  const colors = [
    { color: "limeGreen", hex: "#32cd32" },
    { color: "orange-red", hex: "#ff4500" },
    { color: "green", hex: "#008000" },
    { color: "blue", hex: "#0000ff" },
    { color: "darkOliveGreen", hex: "#556b2f" },
    { color: "darkBlue", hex: "#00008b" },
    { color: "orange", hex: "#ffa500" },
    { color: "purple", hex: "#800080" },
    { color: "pink", hex: "#ffc0cb" },
    { color: "gray", hex: "#808080" },
    { color: "red", hex: "#ff0000" },
  ];

  useEffect(() => {
    let newLabelArr = [];
    savedRecipes?.map((item) => {
      item.recipe.dishType.map((el) => {
        let found = newLabelArr.includes(el);
        if (!found) {
          newLabelArr.push(el);
        }
        return null;
      });
      return null;
    });
    setLabels(newLabelArr);
  }, [savedRecipes]);

  const showNoteBox = savedRecipes?.some((el) => el.showNoteBox === true);

  return (
    <myRecipesContext.Provider
      value={{ labels, setLabels, selectedLabel, setSelectedLabel, colors }}
    >
      {savedRecipes.length > 0 ? (
        <div className={styles.myRecipesPage}>
          {showNoteBox && <NoteLightBox />}
          <div className={styles.header}>
            <h1>My Recipes</h1>
            <CardViewFilter />
          </div>
          <div className={styles.pageContent}>
            <div className={styles.leftPanel}>
              <DirectoryPanel />
            </div>
            <div className={styles.rightPanel}>
              <CardViewPanel />
            </div>
          </div>
          {showRecipeView && <RecipeView />}
        </div>
      ) : (
        <div className={styles.addRecipesContainer}>
          <p>Save Recipes by adding to "My Recipes"</p>
          <img src={addRecipes} />
        </div>
      )}
    </myRecipesContext.Provider>
  );
};

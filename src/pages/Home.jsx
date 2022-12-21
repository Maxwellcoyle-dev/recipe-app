import React, { useContext } from "react";
import styles from "../styles/pages/home/home.module.css";
import { HomeFeed } from "../components/home/homeFeed/HomeFeed";
import { HeroContainer } from "../components/home/hero/HeroContainer";
import { RecipeView } from "../components/recipeView/RecipeView";
import { appContext } from "../context/appContext";

export const Home = ({ pageRef }) => {
  const { showRecipeView } = useContext(appContext);

  return (
    <div className={styles.home} ref={pageRef}>
      <div className={styles.homeContent}>
        <HeroContainer />
        <HomeFeed />
      </div>
      {showRecipeView && <RecipeView />}
    </div>
  );
};

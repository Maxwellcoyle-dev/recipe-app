import React, { useContext } from "react";
import styles from "../styles/pages/home/home.module.css";
import { HomeFeed } from "../components/home/HomeFeed";
import { RecipeView } from "../components/recipeView/RecipeView";
import { appContext } from "../context/appContext";
import { HeroSection } from "../components/home/HeroSection";

export const Home = () => {
  const { showRecipeView } = useContext(appContext);

  return (
    <div className={styles.home}>
      <HeroSection />
      <HomeFeed />
      {showRecipeView && <RecipeView />}
    </div>
  );
};

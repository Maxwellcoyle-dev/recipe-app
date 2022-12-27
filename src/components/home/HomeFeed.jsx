import React, { useState, useEffect } from "react";
import { useGetNextPageDefaults } from "../../hooks/useGetNextPageDefaults";
import styles from "../../styles/pages/home/home.module.css";
import { RecipeCard } from "./RecipeCard";
import { TbReportSearch } from "react-icons/tb";
import { NextPage } from "./NextPage";
import { ScrollTop } from "./ScrollTop";
import { useHomeQueries } from "../../hooks/useHomeQueries";

export const HomeFeed = () => {
  const [showTopArrow, setShowTopArrow] = useState(false);

  const { refetchNextPageDefaults } = useGetNextPageDefaults();
  const { recipes } = useHomeQueries();

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowTopArrow(true);
    } else {
      setShowTopArrow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.homeFeed}>
      <div className={styles.homeFeedHeader}>
        <div className={styles.headerTitleDiv}>
          <TbReportSearch className={styles.icon} />
          <h2>Browse Recipes</h2>
        </div>
      </div>

      <div className={styles.homeFeedCardContainer}>
        {recipes?.map((hit, index) => {
          return <RecipeCard recipe={hit.recipe} key={index} />;
        })}
      </div>
      <NextPage refetchNextPage={refetchNextPageDefaults} />
      {showTopArrow && <ScrollTop />}
    </div>
  );
};

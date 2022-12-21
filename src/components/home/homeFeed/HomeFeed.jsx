import React from "react";
import styles from "../../../styles/pages/home/home.module.css";
import { useGetHomeFeedRecipes } from "../../../hooks/useGetHomeFeedRecipes";
import { FeedScrollContainer } from "./FeedScrollContainer";

export const HomeFeed = () => {
  const {
    mainCourseQuery,
    mainCourseStatus,
    saladQuery,
    saladStatus,
    drinksQuery,
    drinksStatus,
    soupQuery,
    soupStatus,
  } = useGetHomeFeedRecipes();

  return (
    <div className={styles.homeFeed}>
      <FeedScrollContainer
        recipes={mainCourseQuery}
        status={mainCourseStatus}
      />
      <FeedScrollContainer recipes={saladQuery} status={saladStatus} />
      <FeedScrollContainer recipes={drinksQuery} status={drinksStatus} />
      <FeedScrollContainer recipes={soupQuery} status={soupStatus} />
    </div>
  );
};

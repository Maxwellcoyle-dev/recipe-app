import React from "react";
import styles from "../../../styles/pages/search/search.module.css";
import { FilterBox } from "./FilterBox";
import { searchCategories } from "../searchCatories";

export const FilterContainer = ({
  handleBoxItemClick,
  healthLabelsCheck,
  cuisineLabelsCheck,
  dishLabelsCheck,
  dietLabelsCheck,
  mealLabelsCheck,
  searchBarHeight,
}) => {
  return (
    <div className={styles.filter} styles={{ top: searchBarHeight }}>
      <div className={styles.filterContainer}>
        {searchCategories.map((filterBoxData, index) => {
          return (
            <FilterBox
              filterBoxData={filterBoxData}
              key={index}
              handleBoxItemClick={handleBoxItemClick}
              healthLabelsCheck={healthLabelsCheck}
              cuisineLabelsCheck={cuisineLabelsCheck}
              dishLabelsCheck={dishLabelsCheck}
              dietLabelsCheck={dietLabelsCheck}
              mealLabelsCheck={mealLabelsCheck}
            />
          );
        })}
      </div>
    </div>
  );
};

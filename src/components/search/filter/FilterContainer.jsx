import React, { useRef, useContext } from "react";
import styles from "../../../styles/pages/search/search.module.css";
import { searchContext } from "../../../context/searchContext";
import { FilterBox } from "./FilterBox";
import { searchCategories } from "../searchCatories";
import { useSpring, animated } from "@react-spring/web";
import { BsFilterLeft } from "react-icons/bs";

export const FilterContainer = ({
  handleBoxItemClick,
  healthLabelsCheck,
  cuisineLabelsCheck,
  dishLabelsCheck,
  dietLabelsCheck,
  mealLabelsCheck,
  searchBarHeight,
}) => {
  const { showFilter, setShowFilter } = useContext(searchContext);

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

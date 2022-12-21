import React from "react";
import styles from "../../../styles/pages/search/search.module.css";
import { FilterBoxItem } from "./FilterBoxItem";

export const FilterBox = ({
  filterBoxData,
  handleBoxItemClick,
  healthLabelsCheck,
  cuisineLabelsCheck,
  dishLabelsCheck,
  dietLabelsCheck,
  mealLabelsCheck,
}) => {
  let filterArray;

  switch (filterBoxData.category) {
    case "Health":
      filterArray = healthLabelsCheck;
      break;
    case "Cuisine":
      filterArray = cuisineLabelsCheck;
      break;

    case "Dish":
      filterArray = dishLabelsCheck;
      break;

    case "Diet":
      filterArray = dietLabelsCheck;
      break;

    case "Meal":
      filterArray = mealLabelsCheck;
      break;
    default:
      break;
  }

  return (
    <div className={styles.filterBoxContainer}>
      <h3>{filterBoxData.category}</h3>
      <div className={styles.filterBox}>
        {filterBoxData.filterItems.map((item, index) => {
          return (
            <FilterBoxItem
              key={index}
              position={index}
              label={item.label}
              name={item.name}
              handleBoxItemClick={handleBoxItemClick}
              filterArray={filterArray}
            />
          );
        })}
      </div>
    </div>
  );
};

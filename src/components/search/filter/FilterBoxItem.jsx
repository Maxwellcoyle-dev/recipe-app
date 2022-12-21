import React from "react";
import styles from "../../../styles/pages/search/search.module.css";

export const FilterBoxItem = ({
  label,
  name,
  position,
  handleBoxItemClick,
  filterArray,
}) => {
  return (
    <button
      className={
        filterArray[position]
          ? styles.filterBoxItemSelected
          : styles.filterBoxItem
      }
      onClick={() => {
        handleBoxItemClick(position, label);
      }}
    >
      {name}
    </button>
  );
};

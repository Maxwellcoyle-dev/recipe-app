import React, { useEffect } from "react";
import styles from "../../../styles/pages/protein_carb_fat/pages.module.css";
import { FilterLabel } from "./FilterLabel";
import { IoFilter } from "react-icons/io5";

export const Filter = ({
  recipes,
  labels,
  colors,
  setLabels,
  labelIndex,
  setLabelIndex,
}) => {
  useEffect(() => {
    if (recipes !== null) {
      let newLabelArr = [];
      recipes?.map((item) => {
        if (item?.recipe?.dishType) {
          item?.recipe.dishType.map((el) => {
            let found = newLabelArr.includes(el);
            if (!found) {
              newLabelArr.push(el);
            }
            return null;
          });
        }
        return null;
      });
      setLabels(newLabelArr);
    }
  }, [recipes, setLabels]);

  return (
    <div className={styles.cardViewFilter}>
      <IoFilter className={styles.filterIcon} />
      {labels?.map((label, index) => {
        return (
          <FilterLabel
            label={label}
            key={index}
            color={colors[index]}
            id={index}
            labelIndex={labelIndex}
            setLabelIndex={setLabelIndex}
          />
        );
      })}
    </div>
  );
};

import React, { useEffect } from "react";
import styles from "../../../styles/pages/protein_carb_fat/pages.module.css";
import { FilterLabel } from "./FilterLabel";
import { AiOutlineFilter } from "react-icons/ai";

export const Filter = ({
  recipes,
  labels,
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
      <AiOutlineFilter className={styles.filterIcon} />
      {labels?.map((label, index) => {
        return (
          <FilterLabel
            label={label}
            key={index}
            id={index}
            labelIndex={labelIndex}
            setLabelIndex={setLabelIndex}
          />
        );
      })}
    </div>
  );
};

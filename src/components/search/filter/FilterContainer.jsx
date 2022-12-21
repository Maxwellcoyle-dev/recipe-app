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
  searchTopHeight,
}) => {
  const { showFilter, setShowFilter } = useContext(searchContext);

  const filterContainer = useRef(0);

  const springStyles = useSpring({
    to: { top: searchTopHeight },
    from: {
      top: -filterContainer.current.scrollHeight,
    },
    reverse: showFilter,
    config: {
      tension: 400,
      friction: 75,
    },
  });

  return (
    <animated.div
      style={springStyles}
      className={styles.fitlerAnimationWrapper}
      ref={filterContainer}
    >
      <div className={styles.filterWrapper}>
        <div className={styles.filterHeader}>
          <h2>Search Filter</h2>
          <div
            className={styles.iconDiv}
            onClick={() => setShowFilter(!showFilter)}
          >
            <BsFilterLeft className={styles.filterHeaderIcon} />
          </div>
        </div>

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
    </animated.div>
  );
};

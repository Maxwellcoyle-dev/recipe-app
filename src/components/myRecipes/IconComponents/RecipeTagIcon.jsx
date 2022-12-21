import React, { useContext } from "react";
import styles from "../../../styles/pages/myRecipes/myRecipes.module.css";
import { searchContext } from "../../../context/searchContext";
import { MdLabelOutline, MdLabel } from "react-icons/md";

export const RecipeTagIcon = ({ id, labels }) => {
  const { savedRecipesDispatch } = useContext(searchContext);

  const hasLabel = labels.length > 0;

  const handleLabelIconClick = () => {
    savedRecipesDispatch({
      type: "label-box-toggle",
      id: id,
    });
  };

  return (
    <>
      {hasLabel ? (
        <div className={styles.iconDiv} onClick={handleLabelIconClick}>
          <MdLabel className={styles.iconSelected} />
        </div>
      ) : (
        <div className={styles.iconDiv} onClick={handleLabelIconClick}>
          <MdLabelOutline className={styles.iconInitial} />
        </div>
      )}
    </>
  );
};

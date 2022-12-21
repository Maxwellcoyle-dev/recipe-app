import React, { useContext } from "react";
import styles from "../../../styles/pages/myRecipes/myRecipes.module.css";
import { searchContext } from "../../../context/searchContext";
import { MdEditNote } from "react-icons/md";

export const RecipeNoteIcon = ({ id }) => {
  const { savedRecipesDispatch } = useContext(searchContext);

  const handleNoteIconClick = () => {
    savedRecipesDispatch({
      type: "note-box-toggle",
      id: id,
    });
  };

  return (
    <div className={styles.iconDiv} onClick={handleNoteIconClick}>
      <MdEditNote className={styles.iconInitial} />
    </div>
  );
};

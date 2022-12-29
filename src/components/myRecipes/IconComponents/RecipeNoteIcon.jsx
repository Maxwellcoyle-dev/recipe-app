import React, { useContext, useEffect } from "react";
import styles from "../../../styles/pages/myRecipes/myRecipes.module.css";
import { searchContext } from "../../../context/searchContext";
import { MdEditNote } from "react-icons/md";

export const RecipeNoteIcon = ({ id, note }) => {
  const { savedRecipesDispatch } = useContext(searchContext);

  const noteExists = note !== "";

  const handleNoteIconClick = () => {
    savedRecipesDispatch({
      type: "note-box-toggle",
      id: id,
    });
  };

  return (
    <div className={styles.iconDiv} onClick={handleNoteIconClick}>
      <MdEditNote
        className={styles.iconInitial}
        style={{ color: noteExists ? "#689c7b" : "#7b7773" }}
      />
    </div>
  );
};

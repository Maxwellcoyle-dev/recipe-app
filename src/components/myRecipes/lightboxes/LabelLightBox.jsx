import React, { useContext, useState, useEffect } from "react";
import styles from "../../../styles/pages/myRecipes/myRecipes.module.css";
import { searchContext } from "../../../context/searchContext";
import { LabelColorPicker } from "./LabelColorPicker";
import { MdLabelOutline } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

export const LabelLightBox = ({ id }) => {
  const [newLabel, setNewLabel] = useState("");
  const [recipeId, setRecipeId] = useState(0);
  const { savedRecipes, savedRecipesDispatch } = useContext(searchContext);

  useEffect(() => {
    savedRecipes?.map((rec) => {
      if (rec.showLabelBox) {
        if (rec.labels[0]) {
          setNewLabel(rec?.labels[0]?.label);
          setRecipeId(rec.id);
        } else {
          setNewLabel("");
          setRecipeId(rec.id);
        }
      }
    });
  }, [savedRecipes]);

  const handleNewLabelChange = (e) => {
    savedRecipesDispatch({
      type: "update-new-label",
      labelText: e.target.value,
      id: recipeId,
    });
  };

  const handleAddNewLabel = (e) => {
    e.preventDefault();
    savedRecipesDispatch({
      type: "add-new-label",
      id: recipeId,
    });
  };

  const handleCloseBox = () => {
    savedRecipesDispatch({
      type: "label-box-toggle",
      id: id,
    });
  };

  return (
    <div className={styles.overlayWrapper}>
      <div className={styles.lightBoxOverlay}>
        <div className={styles.lightBox}>
          <div className={styles.headerRow}>
            <MdLabelOutline className={styles.headerIcon} />
            <h2>Add a Label</h2>
          </div>
          <form className={styles.labelBoxForm}>
            <input
              type="text"
              placeholder="Type label here"
              value={newLabel}
              onChange={(e) => handleNewLabelChange(e)}
            />
            <LabelColorPicker />
            <div className={styles.buttonDiv}>
              <button
                className={styles.primaryBtn}
                onClick={(e) => handleAddNewLabel(e)}
              >
                Add
              </button>
              <button className={styles.secondaryBtn}>Clear</button>
            </div>
          </form>
          <div className={styles.closeIconDiv}>
            <AiOutlineClose
              className={styles.closeIcon}
              onClick={handleCloseBox}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

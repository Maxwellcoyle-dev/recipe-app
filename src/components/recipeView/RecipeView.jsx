import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/recipeView/recipeView.module.css";
import { useScrollLock } from "../../hooks/useScrollLock";
import { AiOutlineClose } from "react-icons/ai";
import { SaveIcon } from "./SaveIcon";
import { appContext } from "../../context/appContext";
import { searchContext } from "../../context/searchContext";

export const RecipeView = () => {
  const [currentNote, setCurrentNote] = useState("");
  const [id, setId] = useState(0);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [newNote, setNewNote] = useState("");
  const { lockScroll, unlockScroll } = useScrollLock();
  const { savedRecipes, savedRecipesDispatch } = useContext(searchContext);
  const { setShowRecipeView, recipeItem } = useContext(appContext);

  const handleNoteChange = (e) => {
    savedRecipesDispatch({
      type: "update-note",
      note: e.target.value,
      id: id,
    });
  };

  const handleClearNote = (e) => {
    e.preventDefault();
    savedRecipesDispatch({
      type: "clear-note",
      id: id,
    });
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    savedRecipesDispatch({
      type: "save-note",
      id: id,
    });
  };

  const handleCloseBox = () => {
    savedRecipesDispatch({
      type: "note-box-toggle",
      id: id,
    });
  };

  useEffect(() => {
    lockScroll();

    return () => {
      unlockScroll();
    };
  }, []);

  let found = savedRecipes?.some(
    (item) => item?.recipe?.label === recipeItem?.label
  );

  useEffect(() => {
    if (found) {
      savedRecipes?.map((item) => {
        if (item?.recipe.label === recipeItem?.label) {
          setCurrentNote(item?.note);
          setId(item.id);
          setShowNoteInput(item.showNoteBox);
          setNewNote(item.note);
        }
        return null;
      });
    }
  }, [savedRecipes, recipeItem, found]);

  return (
    <div className={styles.recipeViewBackDrop}>
      <div className={styles.recipeViewCard}>
        <div className={styles.headerRow}>
          <h2>{recipeItem?.label}</h2>
          <a href={recipeItem?.url} className={styles.sourceTag}>
            <p>by {recipeItem?.source}</p>
          </a>
          <div className={styles.buttonDiv}>
            <a href={recipeItem?.url} target="_blank" rel="noreferrer">
              <button className={styles.primaryBtn}>See Full Recipe</button>
            </a>
            {found ? (
              <button
                className={styles.secondaryBtn}
                onClick={() => {
                  savedRecipesDispatch({
                    type: "delete-recipe",
                    label: recipeItem?.label,
                  });
                }}
              >
                Remove Recipe
              </button>
            ) : (
              <button
                className={styles.secondaryBtn}
                onClick={() => {
                  savedRecipesDispatch({
                    type: "save-recipe",
                    recipe: recipeItem,
                  });
                }}
              >
                Save Recipe
              </button>
            )}
          </div>

          <div className={styles.imgDiv}>
            <img alt={recipeItem?.label} src={recipeItem?.image} />
          </div>
          {!showNoteInput ? (
            <div className={styles.notesDiv}>
              <h3>Notes</h3>
              {found ? (
                currentNote === "" ? (
                  <p
                    className={styles.addNoteText}
                    onClick={() => {
                      savedRecipesDispatch({
                        type: "note-box-toggle",
                        id: id,
                      });
                    }}
                  >
                    Click here to add a note.
                  </p>
                ) : (
                  <p>{currentNote}</p>
                )
              ) : (
                <p
                  className={styles.saveRecipeText}
                  onClick={() => {
                    savedRecipesDispatch({
                      type: "save-recipe",
                      recipe: recipeItem,
                    });
                  }}
                >
                  Save recipe to add a note.
                </p>
              )}
            </div>
          ) : (
            <div className={styles.addNote}>
              <h3>Add Note</h3>
              <form onSubmit={(e) => handleSaveNote(e)}>
                <textarea
                  type="text"
                  placeholder="Type notes here"
                  className={styles.textArea}
                  value={newNote}
                  onChange={(e) => handleNoteChange(e)}
                />
                <div className={styles.buttonDiv}>
                  <button type="submit" className={styles.primaryBtn}>
                    Add
                  </button>
                  <button
                    className={styles.secondaryBtn}
                    onClick={handleClearNote}
                  >
                    Clear
                  </button>
                </div>
              </form>
              <div className={styles.closeIconDiv}>
                <AiOutlineClose
                  className={styles.closeIcon}
                  onClick={(e) => handleCloseBox(e)}
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles.secondRow}>
          <div className={styles.overviewDiv}>
            <h3>Recipe Info</h3>
            <div className={styles.items}>
              <p>{recipeItem?.dishType}</p>
              <p>{recipeItem?.cuisineType}</p>
              <p>{Math.round(recipeItem?.calories)} calories</p>
            </div>
          </div>
          {recipeItem?.cautions?.length > 0 && (
            <div className={styles.overviewDiv}>
              <h3>Cautions</h3>
              <div className={styles.items}>
                {recipeItem?.cautions?.map((caution, index) => {
                  return (
                    <p key={index} style={{ borderColor: "red" }}>
                      {caution}
                    </p>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className={styles.infoDiv}>
          <h3>Ingredients</h3>
          <div className={styles.infoItems}>
            {recipeItem?.ingredientLines?.map((ingredient, index) => {
              return (
                <div key={index} className={styles.ingredientDiv}>
                  <p>{ingredient}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.infoDiv}>
          <h3>HealthLabels</h3>
          <div className={styles.infoItems}>
            {recipeItem?.healthLabels?.map((label, index) => {
              return (
                <div key={index} className={styles.ingredientDiv}>
                  <p>{label}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={styles.exitIconDiv}
          onClick={() => setShowRecipeView(false)}
        >
          <AiOutlineClose className={styles.exitIcon} />
        </div>
        <SaveIcon recipe={recipeItem} />
      </div>
    </div>
  );
};

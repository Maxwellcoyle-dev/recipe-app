import React, { useContext, useEffect, useState } from "react";
import styles from "../../../styles/pages/myRecipes/myRecipes.module.css";
import { searchContext } from "../../../context/searchContext";
import { AiOutlineClose } from "react-icons/ai";
import { MdEditNote } from "react-icons/md";

export const NoteLightBox = () => {
  const [newNote, setNewNote] = useState("");
  const [noteId, setNoteId] = useState(0);
  const { savedRecipes, savedRecipesDispatch } = useContext(searchContext);

  useEffect(() => {
    savedRecipes?.map((rec) => {
      if (rec.showNoteBox) {
        setNewNote(rec.note);
        setNoteId(rec.id);
      }
      return null;
    });
  }, [savedRecipes]);

  const handleNoteChange = (e) => {
    savedRecipesDispatch({
      type: "update-note",
      note: e.target.value,
      id: noteId,
    });
  };

  const handleCloseBox = () => {
    savedRecipesDispatch({
      type: "note-box-toggle",
      id: noteId,
    });
  };

  const handleClearNote = (e) => {
    e.preventDefault();
    savedRecipesDispatch({
      type: "clear-note",
      id: noteId,
    });
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    savedRecipesDispatch({
      type: "save-note",
      id: noteId,
    });
  };

  return (
    <div className={styles.overlayWrapper}>
      <div className={styles.lightBoxOverlay}>
        <div className={styles.lightBox}>
          <div className={styles.headerRow}>
            <MdEditNote className={styles.headerIcon} />
            <h2>Add a Note</h2>
          </div>
          <form className={styles.noteBoxForm}>
            <textarea
              type="text"
              placeholder="Type notes here"
              value={newNote}
              onChange={(e) => handleNoteChange(e)}
            />
            <div className={styles.buttonDiv}>
              <button
                className={styles.primaryBtn}
                onClick={(e) => handleSaveNote(e)}
              >
                Add
              </button>
              <button className={styles.secondaryBtn} onClick={handleClearNote}>
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
      </div>
    </div>
  );
};

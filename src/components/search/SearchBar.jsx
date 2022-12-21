import React, { useContext } from "react";
import styles from "../../styles/pages/search/search.module.css";
import { searchContext } from "../../context/searchContext";
import { BsFilterLeft } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";

export const SearchBar = ({ handleSubmit }) => {
  const { input, setInput, setShowFilter, showFilter } =
    useContext(searchContext);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.searchBarForm} onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search"
          value={input}
          onChange={(e) => handleInputChange(e)}
        />
        <button>
          <AiOutlineArrowRight className={styles.formSearchIcon} />
        </button>
        <div
          className={styles.filterIconDiv}
          onClick={() => setShowFilter(!showFilter)}
        >
          <BsFilterLeft className={styles.filterIcon} />
        </div>
      </form>
    </div>
  );
};

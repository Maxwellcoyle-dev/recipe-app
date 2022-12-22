import React, { useContext, useEffect } from "react";
import styles from "../../styles/pages/search/search.module.css";
import { searchContext } from "../../context/searchContext";
import { AiOutlineArrowRight } from "react-icons/ai";

export const SearchBar = ({ handleSubmit }) => {
  const { input, setInput } = useContext(searchContext);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
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
    </form>
  );
};

import { useState, useContext, useEffect, useRef } from "react";
import styles from "../styles/pages/search/search.module.css";
import { searchContext } from "../context/searchContext";
import { SearchBar } from "../components/search/SearchBar";
import { FilterContainer } from "../components/search/filter/FilterContainer";
import { searchCategories } from "../components/search/searchCatories";
import { SearchResults } from "../components/search/SearchResults";
import { SearchHistory } from "../components/search/SearchHistory";
import { RecipeView } from "../components/recipeView/RecipeView";
import { NextPage } from "../components/protein_carb_fat/NextPage";
import { useGetNextPageSearchResults } from "../hooks/useGetNextPageSearchResults";
import { appContext } from "../context/appContext";

export const Search = () => {
  const [searchTopHeight, setSearchTopHeight] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const { refetchNextPageSearchResults } = useGetNextPageSearchResults();
  const { showRecipeView } = useContext(appContext);
  const {
    setSearchParam,
    input,
    setSearchHistory,
    searchHistory,
    showFilter,
    setShowFilter,
  } = useContext(searchContext);

  const searchTop = useRef(null);

  const [healthLabelsCheck, setHealthLabelsCheck] = useState(
    new Array(searchCategories[0].filterItems.length).fill(false)
  );
  const [cuisineLabelsCheck, setCuisineLabelsCheck] = useState(
    new Array(searchCategories[1].filterItems.length).fill(false)
  );
  const [dishLabelsCheck, setDishLabelsCheck] = useState(
    new Array(searchCategories[2].filterItems.length).fill(false)
  );
  const [dietLabelsCheck, setDietLabelsCheck] = useState(
    new Array(searchCategories[3].filterItems.length).fill(false)
  );
  const [mealLabelsCheck, setMealLabelsCheck] = useState(
    new Array(searchCategories[4].filterItems.length).fill(false)
  );

  const handleBoxItemClick = (position, label) => {
    switch (label) {
      case "health":
        const healthLabelCheckedState = healthLabelsCheck.map((item, index) =>
          index === position ? !item : item
        );

        setHealthLabelsCheck(healthLabelCheckedState);
        break;

      case "cuisineType":
        const cuisineLabelCheckedState = cuisineLabelsCheck.map((item, index) =>
          index === position ? !item : item
        );

        setCuisineLabelsCheck(cuisineLabelCheckedState);
        break;

      case "dishType":
        const dishLabelsCheckState = dishLabelsCheck.map((item, index) =>
          index === position ? !item : item
        );

        setDishLabelsCheck(dishLabelsCheckState);
        break;

      case "diet":
        const dietLabelsCheckState = dietLabelsCheck.map((item, index) =>
          index === position ? !item : item
        );

        setDietLabelsCheck(dietLabelsCheckState);
        break;

      case "mealType":
        const mealLabelsCheckState = mealLabelsCheck.map((item, index) =>
          index === position ? !item : item
        );

        setMealLabelsCheck(mealLabelsCheckState);
        break;
      default:
        break;
    }
  };

  let params;

  const handleSubmit = (e) => {
    e.preventDefault();
    params = new URLSearchParams({
      type: "public",
      app_id: "5aaef2eb",
      app_key: `${process.env.REACT_APP_API_SECRET}`,
    });

    params.append("q", input);

    for (let i = 0; i < healthLabelsCheck.length; i++) {
      if (healthLabelsCheck[i]) {
        let newKey = searchCategories[0].filterItems[i].label;
        let newVal = searchCategories[0].filterItems[i].name;
        params.append(newKey, newVal);
      }
    }

    for (let i = 0; i < cuisineLabelsCheck.length; i++) {
      if (cuisineLabelsCheck[i]) {
        let newKey = searchCategories[1].filterItems[i].label;
        let newVal = searchCategories[1].filterItems[i].name;
        params.append(newKey, newVal);
      }
    }

    for (let i = 0; i < dishLabelsCheck.length; i++) {
      if (dishLabelsCheck[i]) {
        let newKey = searchCategories[2].filterItems[i].label;
        let newVal = searchCategories[2].filterItems[i].name;
        params.append(newKey, newVal);
      }
    }

    for (let i = 0; i < dietLabelsCheck.length; i++) {
      if (dietLabelsCheck[i]) {
        let newKey = searchCategories[3].filterItems[i].label;
        let newVal = searchCategories[3].filterItems[i].name;
        params.append(newKey, newVal);
      }
    }

    for (let i = 0; i < mealLabelsCheck.length; i++) {
      if (mealLabelsCheck[i]) {
        let newKey = searchCategories[4].filterItems[i].label;
        let newVal = searchCategories[4].filterItems[i].name;
        params.append(newKey, newVal);
      }
    }
    setShowFilter(true);
    setSearchParam(params.toString());

    if (input !== "" && searchHistory.length < 10) {
      setSearchHistory((prev) => [input, ...prev]);
    }

    if (input !== "" && searchHistory.length === 10) {
      const newArr = searchHistory.slice(0, 9);
      newArr.unshift(input);
      setSearchHistory(newArr);
    }
  };

  const filterClosedStyle = {
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
  };

  useEffect(() => {
    setSearchTopHeight(searchTop.current.clientHeight);
  }, [searchTop]);

  return (
    <div className={styles.search}>
      <div className={styles.searchBarStickyContainer}>
        <div className={styles.searchBarStickyItem}>
          <div className={styles.stickyItemWrapper}>
            <div
              className={styles.searchTopWrapper}
              style={filterClosedStyle}
              ref={searchTop}
            >
              <SearchBar handleSubmit={handleSubmit} />
              <SearchHistory />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.searchBottomWrapper}>
        <SearchResults
          searchTopHeight={searchTopHeight}
          showFilter={showFilter}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
        />
        <FilterContainer
          handleBoxItemClick={handleBoxItemClick}
          healthLabelsCheck={healthLabelsCheck}
          cuisineLabelsCheck={cuisineLabelsCheck}
          dishLabelsCheck={dishLabelsCheck}
          dietLabelsCheck={dietLabelsCheck}
          mealLabelsCheck={mealLabelsCheck}
          searchTopHeight={searchTopHeight}
        />
        {searchResults.length > 0 && (
          <NextPage refetchNextPage={refetchNextPageSearchResults} />
        )}
        {showRecipeView && <RecipeView />}
      </div>
    </div>
  );
};

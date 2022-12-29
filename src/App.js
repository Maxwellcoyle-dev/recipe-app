import { useState, useEffect, useReducer } from "react";
import styles from "./styles/app/app.module.css";
import { searchContext } from "./context/searchContext";
import { appContext } from "./context/appContext";
import { Home } from "./pages/Home";
import { MyRecipes } from "./pages/MyRecipes";
import { HighProtein } from "./pages/HighProtein";
import { LowFat } from "./pages/LowFat";
import { LowCarb } from "./pages/LowCarb";
import { Search } from "./pages/Search";
import { Navbar } from "./components/navbar/Navbar";
import { savedRecipesReducer } from "./components/myRecipes/savedRecipesReducer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let existingRecipes = window.localStorage.getItem("SAVED_RECIPES");

const queryClient = new QueryClient();

function App() {
  // appContext
  const [homeRecipes, setHomeRecipes] = useState(null);
  const [searchResultsNextPageUrl, setSearchResultsNextPageUrl] = useState("");
  const [homeNextPageUrl, setHomeNextPageUrl] = useState("");
  const [proteinNextPageUrl, setProteinNextPageUrl] = useState("");
  const [lowFatNextPageUrl, setLowFatNextPageUrl] = useState("");
  const [lowCarbNextPageUrl, setLowCarbNextPageUrl] = useState("");
  const [showRecipeView, setShowRecipeView] = useState(false);
  const [recipeItem, setRecipeItem] = useState({});

  // SearchContext
  const [savedRecipes, savedRecipesDispatch] = useReducer(
    savedRecipesReducer,
    []
  );
  const [input, setInput] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    if (existingRecipes) {
      savedRecipesDispatch({
        type: "loacal-storage-recover-saved-list",
        recipe: JSON.parse(existingRecipes),
      });
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("SAVED_RECIPES", JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  return (
    <appContext.Provider
      value={{
        homeRecipes,
        setHomeRecipes,
        homeNextPageUrl,
        setHomeNextPageUrl,
        searchResultsNextPageUrl,
        setSearchResultsNextPageUrl,
        proteinNextPageUrl,
        setProteinNextPageUrl,
        lowFatNextPageUrl,
        setLowFatNextPageUrl,
        lowCarbNextPageUrl,
        setLowCarbNextPageUrl,
        showRecipeView,
        setShowRecipeView,
        recipeItem,
        setRecipeItem,
      }}
    >
      <div className={styles.app}>
        <QueryClientProvider client={queryClient}>
          <searchContext.Provider
            value={{
              searchParam,
              setSearchParam,
              input,
              setInput,
              searchHistory,
              setSearchHistory,
              showFilter,
              setShowFilter,
              showSearchBar,
              setShowSearchBar,
              savedRecipes,
              savedRecipesDispatch,
            }}
          >
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/high-protein" element={<HighProtein />} />
              <Route path="/low-fat" element={<LowFat />} />
              <Route path="/low-carb" element={<LowCarb />} />
              <Route path="/my-recipes" element={<MyRecipes />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </searchContext.Provider>
        </QueryClientProvider>
      </div>
      <ToastContainer
        autoClose={2000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        progressStyle={{ backgroundColor: "#73bf86" }}
        className={styles.toastContainer}
      />
    </appContext.Provider>
  );
}

export default App;

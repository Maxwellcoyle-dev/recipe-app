import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/pages/protein_carb_fat/pages.module.css";
import { useGetHighProteinRecipes } from "../hooks/useGetHighProteinRecipes";
import { useGetNextPageProtein } from "../hooks/useGetNextPageProtein";
import { FeedCard } from "../components/protein_carb_fat/FeedCard";
import { NextPage } from "../components/protein_carb_fat/NextPage";
import { appContext } from "../context/appContext";
import { Filter } from "../components/protein_carb_fat/filterComponents/Filter";
import { ScrollTop } from "../components/protein_carb_fat/ScrollTop";
import { RecipeView } from "../components/recipeView/RecipeView";
import error from "../images/error.svg";
import { SpinnerCircular } from "spinners-react";

const colors = [
  { color: "limeGreen", hex: "#32cd32" },
  { color: "orange-red", hex: "#ff4500" },
  { color: "green", hex: "#008000" },
  { color: "blue", hex: "#0000ff" },
  { color: "darkOliveGreen", hex: "#556b2f" },
  { color: "darkBlue", hex: "#00008b" },
  { color: "orange", hex: "#ffa500" },
  { color: "purple", hex: "#800080" },
  { color: "pink", hex: "#ffc0cb" },
  { color: "gray", hex: "#808080" },
  { color: "red", hex: "#ff0000" },
];

export const HighProtein = () => {
  const [labels, setLabels] = useState([]);
  const [labelIndex, setLabelIndex] = useState(null);
  const [proteinPageRecipes, setProteinPageRecipes] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [showTopArrow, setShowTopArrow] = useState(false);
  const { proteinQuery, proteinStatus } = useGetHighProteinRecipes();
  const { nextPageProteinQuery, refetchNextPageProtein } =
    useGetNextPageProtein();
  const { setProteinNextPageUrl, showRecipeView } = useContext(appContext);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowTopArrow(true);
    } else {
      setShowTopArrow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (proteinQuery && !nextPageProteinQuery) {
      setProteinNextPageUrl(proteinQuery._links.next.href);
      console.log(proteinQuery);
    }

    setProteinPageRecipes(proteinQuery?.hits);
  }, [proteinQuery, nextPageProteinQuery, setProteinNextPageUrl]);

  useEffect(() => {
    if (nextPageProteinQuery) {
      nextPageProteinQuery.hits.map((hit) => {
        setProteinPageRecipes((prev) => [...prev, hit]);
        return null;
      });

      setProteinNextPageUrl(nextPageProteinQuery._links.next.href);
    }
  }, [nextPageProteinQuery, setProteinNextPageUrl, setProteinPageRecipes]);

  useEffect(() => {
    let newArray = [];
    proteinPageRecipes?.map((item) => {
      if (item?.recipe.dishType) {
        const match = item.recipe.dishType.some(
          (label) => label === labels[labelIndex]
        );
        match && newArray.push(item);
      }
      return null;
    });
    setFilteredRecipes(newArray);
  }, [labelIndex, proteinPageRecipes, labels]);

  const loadingState = (
    <div className={styles.spinnerContainer}>
      <SpinnerCircular
        size={50}
        thickness={100}
        speed={100}
        color="rgb(242, 242, 242)"
        secondaryColor="rgb(115, 191, 134)"
      />
    </div>
  );

  const errorState = (
    <div className={styles.errorContainer}>
      <img src={error} />
      <p>Error</p>
    </div>
  );

  const success = (
    <div className={styles.pageFeed}>
      <div className={styles.header}>
        <h2>High Protein Recipes</h2>
        <Filter
          recipes={proteinPageRecipes}
          labels={labels}
          setLabels={setLabels}
          colors={colors}
          labelIndex={labelIndex}
          setLabelIndex={setLabelIndex}
        />
      </div>

      {filteredRecipes.length < 1 ? (
        <div className={styles.feedCards}>
          {proteinPageRecipes?.map((item, index) => {
            return <FeedCard recipe={item.recipe} key={index} />;
          })}
          <NextPage refetchNextPage={refetchNextPageProtein} />
        </div>
      ) : (
        <div className={styles.feedCards}>
          {filteredRecipes?.map((item, index) => {
            return <FeedCard recipe={item.recipe} key={index} />;
          })}
        </div>
      )}
      {showTopArrow && <ScrollTop />}
      {showRecipeView && <RecipeView />}
    </div>
  );

  switch (proteinStatus) {
    case "loading": {
      return loadingState;
    }
    case "error": {
      return errorState;
    }
    case "success": {
      return success;
    }
    default: {
      break;
    }
  }
};

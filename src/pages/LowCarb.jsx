import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/pages/protein_carb_fat/pages.module.css";
import { useGetLowCarbRecipes } from "../hooks/useGetLowCarbRecipes";
import { useGetNextPageLowCarb } from "../hooks/useGetNextPageLowCarb";
import { appContext } from "../context/appContext";
import { FeedCard } from "../components/protein_carb_fat/FeedCard";
import { NextPage } from "../components/protein_carb_fat/NextPage";
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

export const LowCarb = () => {
  const [labels, setLabels] = useState([]);
  const [labelIndex, setLabelIndex] = useState(null);
  const [lowCarbPageRecipes, setLowCarbPageRecipes] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [showTopArrow, setShowTopArrow] = useState(false);
  const { lowCarbQuery, lowCarbStatus } = useGetLowCarbRecipes();
  const { nextPageLowCarbQuery, refetchNextPageLowCarb } =
    useGetNextPageLowCarb();
  const { setLowCarbNextPageUrl, showRecipeView } = useContext(appContext);

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
    if (lowCarbQuery && !nextPageLowCarbQuery) {
      setLowCarbNextPageUrl(lowCarbQuery._links.next.href);
    }

    setLowCarbPageRecipes(lowCarbQuery?.hits);
  }, [lowCarbQuery, nextPageLowCarbQuery, setLowCarbNextPageUrl]);

  useEffect(() => {
    if (nextPageLowCarbQuery) {
      nextPageLowCarbQuery?.hits.map((hit) => {
        setLowCarbPageRecipes((prev) => [...prev, hit]);
        return null;
      });

      setLowCarbNextPageUrl(nextPageLowCarbQuery._links.next.href);
    }
  }, [nextPageLowCarbQuery, setLowCarbNextPageUrl]);

  useEffect(() => {
    let newArray = [];
    lowCarbPageRecipes?.map((item) => {
      if (item?.recipe.dishType) {
        const match = item.recipe.dishType.some(
          (label) => label === labels[labelIndex]
        );
        match && newArray.push(item);
      }
      return null;
    });
    setFilteredRecipes(newArray);
  }, [labelIndex, labels, lowCarbPageRecipes]);

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
        <h2>Low Carb Recipes</h2>
        <Filter
          recipes={lowCarbPageRecipes}
          labels={labels}
          setLabels={setLabels}
          colors={colors}
          labelIndex={labelIndex}
          setLabelIndex={setLabelIndex}
        />
      </div>

      {filteredRecipes.length < 1 ? (
        <div className={styles.feedCards}>
          {lowCarbPageRecipes?.map((item, index) => {
            return <FeedCard recipe={item.recipe} key={index} />;
          })}
          <NextPage refetchNextPage={refetchNextPageLowCarb} />
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

  switch (lowCarbStatus) {
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

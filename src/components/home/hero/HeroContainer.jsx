import React from "react";
import styles from "../../../styles/pages/home/home.module.css";
import "@splidejs/splide/css";
import { useGetDefaultRecipes } from "../../../hooks/useGetDefaultRecipes";
import { Hero } from "./Hero";
import error from "../../../images/error.svg";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { SpinnerCircular } from "spinners-react";

export const HeroContainer = () => {
  const { defaultRecipesQuery, defaultRecipesStatus } = useGetDefaultRecipes();

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
      <img alt="there was an error loading this content" src={error} />
      <p>Error</p>
    </div>
  );

  const successState = (
    <div className={styles.heroContainer}>
      <Splide
        hasTrack={true}
        options={{
          rewind: true,
          rewindSpeed: 1000,
          gap: "4rem",
          keyboard: true,
        }}
      >
        {defaultRecipesQuery?.hits?.map((hit, index) => {
          if (index < 4) {
            return (
              <SplideSlide className={styles.sliderComponent} key={index}>
                <Hero recipe={hit.recipe} />
              </SplideSlide>
            );
          }
          return null;
        })}
      </Splide>
    </div>
  );

  switch (defaultRecipesStatus) {
    case "loading": {
      return loadingState;
    }
    case "success": {
      return successState;
    }
    case "error": {
      return errorState;
    }
    default: {
      break;
    }
  }
};

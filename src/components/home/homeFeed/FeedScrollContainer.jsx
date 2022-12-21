import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styles from "../../../styles/pages/home/home.module.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { ScrollPercentLine } from "./ScrollPercentLine";
import { RecipeCardView } from "./RecipeCardView";
import error from "../../../images/error.svg";
import { SpinnerCircular } from "spinners-react";

export let feedWidthPix;

export const FeedScrollContainer = ({ recipes, status }) => {
  const [scrollDistance, setScrollDistance] = useState(0);
  const [leftArrowDisplay, setLeftArrowDisplay] = useState("none");
  const [rightArrowDisplay, setRightArrowDisplay] = useState("flex");
  const [scrollPercent, setScrollPercent] = useState(0);
  const sliderRef = useRef(null);

  // HORIZONTAL SCROLL LOGIC
  useEffect(() => {
    if (sliderRef.current) {
      if (scrollDistance === 0) {
        setLeftArrowDisplay("none");
      } else {
        setLeftArrowDisplay("flex");
      }

      if (scrollDistance === sliderRef.current.scrollWidth) {
        setRightArrowDisplay("none");
      } else {
        setRightArrowDisplay("flex");
      }
    }
  }, [scrollDistance]);

  const scrollNext = () => {
    let currentWidth = sliderRef.current.offsetWidth;
    let totalWidth = sliderRef.current.scrollWidth;

    if (scrollDistance === 0) {
      setScrollDistance(currentWidth);
      sliderRef.current.scroll({
        top: 0,
        left: currentWidth,
        behavior: "smooth",
      });
    } else if (scrollDistance === currentWidth) {
      setScrollDistance(currentWidth * 2);
      sliderRef.current.scroll({
        top: 0,
        left: currentWidth * 2,
        behavior: "smooth",
      });
    } else if (scrollDistance === currentWidth * 2) {
      setScrollDistance(currentWidth * 3);
      sliderRef.current.scroll({
        top: 0,
        left: currentWidth * 3,
        behavior: "smooth",
      });
    } else if (scrollDistance === currentWidth * 3) {
      setScrollDistance(totalWidth);
      sliderRef.current.scroll({
        top: 0,
        left: totalWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollBack = () => {
    let currentWidth = sliderRef.current.offsetWidth;
    let totalWidth = sliderRef.current.scrollWidth;

    if (scrollDistance === currentWidth) {
      setScrollDistance(0);
      sliderRef.current.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else if (scrollDistance === currentWidth * 2) {
      setScrollDistance(currentWidth);
      sliderRef.current.scroll({
        top: 0,
        left: currentWidth,
        behavior: "smooth",
      });
    } else if (scrollDistance === currentWidth * 3) {
      setScrollDistance(currentWidth * 2);
      sliderRef.current.scroll({
        top: 0,
        left: currentWidth * 2,
        behavior: "smooth",
      });
    } else if (scrollDistance === totalWidth) {
      setScrollDistance(currentWidth * 3);
      sliderRef.current.scroll({
        top: 0,
        left: currentWidth * 3,
        behavior: "smooth",
      });
    }
  };

  useLayoutEffect(() => {
    if (status === "success") {
      let currentWidth = sliderRef?.current.offsetWidth;
      let totalWidth = sliderRef?.current.scrollWidth;
      if (currentWidth !== totalWidth) {
        if (scrollDistance === 0) {
          setScrollPercent((currentWidth / totalWidth) * 100);
        } else if (scrollDistance === currentWidth) {
          let num = currentWidth * 2;
          setScrollPercent((num / totalWidth) * 100);
        } else if (scrollDistance === currentWidth * 2) {
          let num = currentWidth * 3;
          setScrollPercent((num / totalWidth) * 100);
        } else if (scrollDistance === currentWidth * 3) {
          let num = currentWidth * 4;
          setScrollPercent((num / totalWidth) * 100);
        } else if (scrollDistance === totalWidth) {
          setScrollPercent(100);
        }
      }
    }
  }, [scrollDistance]);

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

  const successState = (
    <div className={styles.feedCategory}>
      <div
        className={styles.leftTrigger}
        onClick={scrollBack}
        style={{
          display: leftArrowDisplay,
        }}
      >
        <AiOutlineLeft className={styles.icon} />
      </div>
      <div
        className={styles.rightTrigger}
        onClick={scrollNext}
        style={{
          display: rightArrowDisplay,
        }}
      >
        <AiOutlineRight className={styles.icon} />
      </div>
      <h3>{recipes?.hits[0]?.recipe.dishType[0].toUpperCase()}</h3>
      <div className={styles.feedSlider} ref={sliderRef}>
        {recipes?.hits.map((hit, index) => {
          return <RecipeCardView recipe={hit.recipe} key={index} />;
        })}
      </div>
      <ScrollPercentLine scrollPercent={scrollPercent} />
    </div>
  );

  switch (status) {
    case "loading": {
      return loadingState;
    }
    case "error": {
      return errorState;
    }
    case "success": {
      return successState;
    }
    default: {
      break;
    }
  }
};

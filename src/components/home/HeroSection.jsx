import React, { useRef } from "react";
import HeroImg from "../../images/hero-img.svg";
import styles from "../../styles/pages/home/home.module.css";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const heroRef = useRef(null);
  const handleBrowseClick = () => {
    window.scroll({
      top: heroRef.current.offsetHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.heroSection} ref={heroRef}>
      <div className={styles.leftDiv}>
        <h1>Recipe Search App</h1>
        <h3>
          Search the web for new recipes, save the ones you like, and take your
          cooking to the next level.
        </h3>
        <div className={styles.buttonDiv}>
          <Link to="/search">
            <button className={styles.primaryBtn}>Search Recipes</button>
          </Link>
          <button className={styles.secondaryBtn} onClick={handleBrowseClick}>
            Browse
          </button>
        </div>
      </div>
      <div className={styles.rightDiv}>
        <img
          alt="cook book animaion"
          src={HeroImg}
          className={styles.heroImg}
        />
      </div>
    </div>
  );
};

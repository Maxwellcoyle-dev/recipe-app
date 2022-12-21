import { useState, useContext, useEffect } from "react";
import "../../styles/app/app.module.css";
import styles from "../../styles/navbar/navbar.module.css";
import { searchContext } from "../../context/searchContext";
import { appContext } from "../../context/appContext";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.png";
import { BsSearch } from "react-icons/bs";
// import { AiOutlineStar } from "react-icons/ai";

export const Navbar = () => {
  // const [mobileView, setMobileView] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const { setShowSearchBar, showSearchBar } = useContext(searchContext);
  const { setShowRecipeView } = useContext(appContext);

  const location = useLocation();

  useEffect(() => {
    const changeNavColor = () => {
      const windowScrollPosition = window.scrollY;

      if (location.pathname !== "/search") {
        if (windowScrollPosition >= 20) {
          setScrolling(true);
          setShowSearchBar(false);
        }
      }

      if (windowScrollPosition < 20) {
        setScrolling(false);
        setShowSearchBar(true);
      }
    };

    window.addEventListener("scroll", changeNavColor);
    return () => {
      window.removeEventListener("scroll", changeNavColor);
    };
  }, [location, setShowSearchBar]);

  const fullNav = (
    <nav
      className={scrolling ? `${styles.scrollingNavbar}` : `${styles.navbar}`}
    >
      <div className={styles.navItemContainer}>
        <Link
          to="/"
          className={styles.linkLogo}
          onClick={() => setShowRecipeView(false)}
        >
          <img alt="recipe-center logo" src={logo} />
        </Link>
        <ul>
          <Link
            to="/"
            className={styles.link}
            onClick={() => setShowRecipeView(false)}
          >
            <li
              className={
                location.pathname === "/"
                  ? styles.selectedLinkBox
                  : styles.linkBox
              }
            >
              Home
            </li>
          </Link>

          <Link
            to="/high-protein"
            className={styles.link}
            onClick={() => setShowRecipeView(false)}
          >
            <li
              className={
                location.pathname === "/high-protein"
                  ? styles.selectedLinkBox
                  : styles.linkBox
              }
            >
              High Protein
            </li>
          </Link>

          <Link
            to="/low-fat"
            className={styles.link}
            onClick={() => setShowRecipeView(false)}
          >
            <li
              className={
                location.pathname === "/low-fat"
                  ? styles.selectedLinkBox
                  : styles.linkBox
              }
            >
              Low-Fat
            </li>
          </Link>

          <Link
            to="/low-carb"
            className={styles.link}
            onClick={() => setShowRecipeView(false)}
          >
            <li
              className={
                location.pathname === "/low-carb"
                  ? styles.selectedLinkBox
                  : styles.linkBox
              }
            >
              Low-Carb
            </li>
          </Link>

          <Link
            to="/my-recipes"
            className={styles.link}
            onClick={() => setShowRecipeView(false)}
          >
            <li
              className={
                location.pathname === "/my-recipes"
                  ? styles.selectedLinkBox
                  : styles.linkBox
              }
            >
              My-Recipes
            </li>
          </Link>
        </ul>
        <div
          className={styles.searchIconBox}
          onClick={() => {
            setShowSearchBar(!showSearchBar);
          }}
        >
          <Link
            to="search"
            className={styles.linkSearchIcon}
            onClick={() => setShowRecipeView(false)}
          >
            <BsSearch className={styles.icon} />
          </Link>
        </div>
      </div>
    </nav>
  );

  // const mobileNav = (
  //   <nav className={styles.mobileNavbar}>
  //     <Link to="/">
  //       <img src={logo} />
  //     </Link>
  //     <Link to="/my-recipes" className={styles.iconBox}>
  //       <AiOutlineStar className={styles.icon} />
  //     </Link>
  //     <div className={styles.iconBox}>
  //       <BsSearch className={styles.icon} />
  //     </div>
  //   </nav>
  // );

  // return mobileView ? mobileNav : fullNav;

  return fullNav;
};

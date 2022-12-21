import React, { useContext, useEffect } from "react";
import styles from "../../styles/pages/search/search.module.css";
import { useGetSearchResults } from "../../hooks/useGetSearchResults";
import { appContext } from "../../context/appContext";
import { ResultsFeedCard } from "./ResultsFeedCard";
import { useGetNextPageSearchResults } from "../../hooks/useGetNextPageSearchResults";

export const SearchResults = ({
  searchTopHeight,
  searchResults,
  setSearchResults,
  showFilter,
}) => {
  const { searchResultsQuery } = useGetSearchResults();
  const { nextPageSearchResultsQuery } = useGetNextPageSearchResults();
  const {
    searchResultsNextPageUrl,
    setSearchResultsNextPageUrl,
    showRecipeView,
  } = useContext(appContext);

  useEffect(() => {
    if (searchResultsQuery) {
      setSearchResultsNextPageUrl(searchResultsQuery?._links.next.href);
      setSearchResults(searchResultsQuery.hits);
    }
  }, [searchResultsQuery]);

  useEffect(() => {
    if (nextPageSearchResultsQuery) {
      setSearchResultsNextPageUrl(nextPageSearchResultsQuery?._links.next.href);
      nextPageSearchResultsQuery?.hits.map((hit) => {
        setSearchResults((prev) => [...prev, hit]);
        return null;
      });
    }
  }, [nextPageSearchResultsQuery]);

  return (
    searchResults.length > 0 && (
      <div
        className={styles.resultsPage}
        style={{ marginTop: searchTopHeight }}
      >
        <div className={styles.searchResults}>
          {searchResults?.map((hit, index) => {
            return <ResultsFeedCard recipe={hit.recipe} key={index} />;
          })}
        </div>
      </div>
    )
  );
};

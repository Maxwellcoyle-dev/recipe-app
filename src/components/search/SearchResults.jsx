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
}) => {
  const { searchResultsQuery } = useGetSearchResults();
  const { nextPageSearchResultsQuery } = useGetNextPageSearchResults();
  const { setSearchResultsNextPageUrl } = useContext(appContext);

  useEffect(() => {
    if (searchResultsQuery) {
      setSearchResultsNextPageUrl(searchResultsQuery?._links.next.href);
      setSearchResults(searchResultsQuery.hits);
    }
  }, [searchResultsQuery, setSearchResults, setSearchResultsNextPageUrl]);

  useEffect(() => {
    if (nextPageSearchResultsQuery) {
      setSearchResultsNextPageUrl(nextPageSearchResultsQuery?._links.next.href);
      nextPageSearchResultsQuery?.hits.map((hit) => {
        setSearchResults((prev) => [...prev, hit]);
        return null;
      });
    }
  }, [
    nextPageSearchResultsQuery,
    setSearchResults,
    setSearchResultsNextPageUrl,
  ]);

  return (
    searchResults.length > 0 && (
      <div
        className={styles.searchResults}
        style={{ marginTop: searchTopHeight }}
      >
        {searchResults?.map((hit, index) => {
          return <ResultsFeedCard recipe={hit.recipe} key={index} />;
        })}
      </div>
    )
  );
};

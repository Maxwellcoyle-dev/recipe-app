import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { searchContext } from "../context/searchContext";

export const useGetSearchResults = () => {
  const { searchParam } = useContext(searchContext);

  const fetchSearchResults = async () => {
    return await axios
      .get(`https://api.edamam.com/api/recipes/v2?${searchParam}`)
      .then((response) => {
        return response.data;
      });
  };

  const {
    data: searchResultsQuery,
    refetch: reftchSearchResults,
    status: searchStatus,
  } = useQuery({
    queryKey: ["search-results", searchParam],
    queryFn: fetchSearchResults,
    enabled: !!searchParam,
    refetchOnMount: false,
    cacheTime: 1000 * 60 * 20,
  });

  return { searchResultsQuery, searchStatus, reftchSearchResults };
};

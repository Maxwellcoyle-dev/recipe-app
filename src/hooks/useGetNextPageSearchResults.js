import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { appContext } from "../context/appContext";

const fetchNextPage = async (nextPageParam) => {
  console.log(nextPageParam);
  return await axios.get(nextPageParam).then((response) => {
    console.log(response.data);
    return response.data;
  });
};

export const useGetNextPageSearchResults = () => {
  const { searchResultsNextPageUrl } = useContext(appContext);

  const {
    data: nextPageSearchResultsQuery,
    status: nextPageSearchResultsStatus,
    refetch: refetchNextPageSearchResults,
  } = useQuery({
    queryKey: ["next-page"],
    queryFn: () => fetchNextPage(searchResultsNextPageUrl),
    enabled: false,
  });

  return {
    nextPageSearchResultsQuery,
    nextPageSearchResultsStatus,
    refetchNextPageSearchResults,
  };
};

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { appContext } from "../context/appContext";

const fetchNextPage = async (nextPageParam) => {
  console.log(nextPageParam);
  return await axios.get(nextPageParam).then((response) => {
    return response.data;
  });
};

export const useGetNextPageDefaults = () => {
  const { homeNextPageUrl } = useContext(appContext);

  const {
    data: nextPageDefaultsQuery,
    status: nextPageDefaultsStatus,
    refetch: refetchNextPageDefaults,
  } = useQuery({
    queryKey: ["next-page-defaults"],
    queryFn: () => fetchNextPage(homeNextPageUrl),
    enabled: false,
  });

  return {
    nextPageDefaultsQuery,
    nextPageDefaultsStatus,
    refetchNextPageDefaults,
  };
};

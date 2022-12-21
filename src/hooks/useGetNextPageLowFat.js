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

export const useGetNextPageLowFat = () => {
  const { lowFatNextPageUrl } = useContext(appContext);

  const {
    data: nextPageLowFatQuery,
    status: nextPageLowFatStatus,
    refetch: refetchNextPageLowFat,
  } = useQuery({
    queryKey: ["next-page-low-fat"],
    queryFn: () => fetchNextPage(lowFatNextPageUrl),
    enabled: false,
  });

  return { nextPageLowFatQuery, nextPageLowFatStatus, refetchNextPageLowFat };
};

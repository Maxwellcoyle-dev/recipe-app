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

export const useGetNextPageLowCarb = () => {
  const { lowCarbNextPageUrl } = useContext(appContext);

  const {
    data: nextPageLowCarbQuery,
    status: nextPageLowCarbStatus,
    refetch: refetchNextPageLowCarb,
  } = useQuery({
    queryKey: ["next-page-low-carb"],
    queryFn: () => fetchNextPage(lowCarbNextPageUrl),
    enabled: false,
  });

  return {
    nextPageLowCarbQuery,
    nextPageLowCarbStatus,
    refetchNextPageLowCarb,
  };
};

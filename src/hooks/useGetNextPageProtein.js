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

export const useGetNextPageProtein = () => {
  const { proteinNextPageUrl } = useContext(appContext);

  const {
    data: nextPageProteinQuery,
    status: nextPageProteinStatus,
    refetch: refetchNextPageProtein,
  } = useQuery({
    queryKey: ["next-page"],
    queryFn: () => fetchNextPage(proteinNextPageUrl),
    enabled: false,
  });

  return {
    nextPageProteinQuery,
    nextPageProteinStatus,
    refetchNextPageProtein,
  };
};

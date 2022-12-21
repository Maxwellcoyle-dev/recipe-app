import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchLowFat = async () => {
  return await axios
    .get(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=5aaef2eb&app_key=${process.env.REACT_APP_API_SECRET}&diet=low-fat`
    )
    .then((response) => {
      return response.data;
    });
};

export const useGetLowFatRecipes = () => {
  const { data: lowFatQuery, status: lowFatStatus } = useQuery({
    queryKey: ["low-fat"],
    queryFn: fetchLowFat,
    enabled: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { lowFatQuery, lowFatStatus };
};

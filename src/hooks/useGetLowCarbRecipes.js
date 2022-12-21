import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchLowCarb = async () => {
  return await axios
    .get(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=5aaef2eb&app_key=${process.env.REACT_APP_API_SECRET}&diet=low-carb`
    )
    .then((response) => {
      return response.data;
    });
};

export const useGetLowCarbRecipes = () => {
  const { data: lowCarbQuery, status: lowCarbStatus } = useQuery({
    queryKey: ["low-carb"],
    queryFn: fetchLowCarb,
    enabled: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { lowCarbQuery, lowCarbStatus };
};

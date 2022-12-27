import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchDefaultRecipes = async () => {
  return await axios
    .get(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=5aaef2eb&app_key=${process.env.REACT_APP_API_SECRET}&dishType=Main%20course&mealType=dinner`
    )
    .then((response) => {
      return response.data;
    });
};

export const useGetDefaultRecipes = () => {
  const { data: defaultRecipesQuery, status: defaultRecipesStatus } = useQuery({
    queryKey: ["default-recipes"],
    queryFn: fetchDefaultRecipes,
    enabled: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { defaultRecipesQuery, defaultRecipesStatus };
};

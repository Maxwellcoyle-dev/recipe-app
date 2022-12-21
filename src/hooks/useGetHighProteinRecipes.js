import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchHighProtein = async () => {
  return await axios
    .get(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=5aaef2eb&app_key=${process.env.REACT_APP_API_SECRET}&diet=high-protein`
    )
    .then((response) => {
      return response.data;
    });
};

export const useGetHighProteinRecipes = () => {
  const { data: proteinQuery, status: proteinStatus } = useQuery({
    queryKey: ["high-protein"],
    queryFn: fetchHighProtein,
    enabled: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { proteinQuery, proteinStatus };
};

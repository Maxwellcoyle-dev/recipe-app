import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetHomeFeedRecipes = () => {
  const { data: mainCourseQuery, status: mainCourseStatus } = useQuery({
    queryKey: ["main-course"],
    queryFn: fetchMainCourse,
    enabled: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: saladQuery, status: saladStatus } = useQuery({
    queryKey: ["salad"],
    queryFn: fetchSalads,
    enabled: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: drinksQuery, status: drinksStatus } = useQuery({
    queryKey: ["drinks"],
    queryFn: fetchDrinks,
    enabled: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: soupQuery, soupStatus } = useQuery({
    queryKey: ["soup"],
    queryFn: fetchSoups,
    enabled: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    mainCourseQuery,
    mainCourseStatus,
    saladQuery,
    saladStatus,
    drinksQuery,
    drinksStatus,
    soupQuery,
    soupStatus,
  };
};

// Fetcher functions that are consumed by the useGetHomeRecipes Hook and called in the useQuery
const fetchMainCourse = async () => {
  return await axios
    .get(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=5aaef2eb&app_key=${process.env.REACT_APP_API_SECRET}&dishType=Main%20course&random=true`
    )
    .then((response) => {
      return response.data;
    });
};

const fetchSalads = async () => {
  return await axios
    .get(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=5aaef2eb&app_key=${process.env.REACT_APP_API_SECRET}&dishType=salad&random=true`
    )
    .then((response) => {
      return response.data;
    });
};

const fetchDrinks = async () => {
  return await axios
    .get(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=5aaef2eb&app_key=${process.env.REACT_APP_API_SECRET}&dishType=drinks&random=true`
    )
    .then((response) => {
      return response.data;
    });
};

const fetchSoups = async () => {
  return await axios
    .get(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=5aaef2eb&app_key=${process.env.REACT_APP_API_SECRET}&dishType=soup&random=true`
    )
    .then((response) => {
      return response.data;
    });
};

const fetchSandwiches = async () => {
  return await axios
    .get(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=5aaef2eb&app_key=${process.env.REACT_APP_API_SECRET}&dishType=Sandwiches&random=true`
    )
    .then((response) => {
      return response.data;
    });
};

const fetchSauces = async () => {
  return await axios
    .get(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=5aaef2eb&app_key=${process.env.REACT_APP_API_SECRET}&dishType=Condiments%20and%20sauces&random=true`
    )
    .then((response) => {
      return response.data;
    });
};

const fetchDesserts = async () => {
  return await axios
    .get(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=5aaef2eb&app_key=${process.env.REACT_APP_API_SECRET}&dishType=Desserts&random=true`
    )
    .then((response) => {
      return response.data;
    });
};

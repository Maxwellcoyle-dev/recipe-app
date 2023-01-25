import { useContext, useState, useEffect } from "react";
import { appContext } from "../context/appContext";
import { useGetDefaultRecipes } from "./useGetDefaultRecipes";
import { useGetNextPageDefaults } from "./useGetNextPageDefaults";

export const useHomeQueries = () => {
  const [recipes, setRecipes] = useState([]);
  const { setHomeNextPageUrl, homeRecipes, setHomeRecipes } =
    useContext(appContext);
  const { nextPageDefaultsQuery } = useGetNextPageDefaults();
  const { defaultRecipesQuery } = useGetDefaultRecipes();

  useEffect(() => {
    if (defaultRecipesQuery && !nextPageDefaultsQuery) {
      console.log(defaultRecipesQuery);
      setHomeNextPageUrl(defaultRecipesQuery?._links.next.href);
    }

    setRecipes(defaultRecipesQuery?.hits);
  }, [defaultRecipesQuery, nextPageDefaultsQuery, setHomeNextPageUrl]);

  useEffect(() => {
    if (nextPageDefaultsQuery) {
      console.log(nextPageDefaultsQuery);
      nextPageDefaultsQuery?.hits.map((hit) => {
        setRecipes((prev) => [...prev, hit]);
        return null;
      });
      console.log(homeRecipes);

      setHomeNextPageUrl(nextPageDefaultsQuery?._links.next.href);
    }
  }, [nextPageDefaultsQuery, setHomeNextPageUrl, setHomeRecipes, homeRecipes]);

  return { recipes };
};

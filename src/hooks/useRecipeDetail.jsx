import * as RecipeApi from '@apis/Recipe.jsx';
import { useEffect, useRef, useState } from 'react';
export default function useRecipeDetail(id) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const controllerRef = useRef();

  useEffect(() => {
    if (!id) {
      setData([]);
      setLoading(false);
      setError(null);
      return;
    }

    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();

    controllerRef.current = controller;
    const { signal } = controller;
    async function run() {
      setLoading(true);
      try {
        const recipeDetails = await RecipeApi.getRecipeDetailsById(id, signal);
        setData(recipeDetails[0]);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    }
    run();
    return () => {
      controllerRef.current?.abort();
      controllerRef.current = null;
    };
  }, [id]);
  return { data, loading, error };
}

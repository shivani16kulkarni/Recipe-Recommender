import * as RecipeApi from '@apis/recipe';
import { useEffect, useRef, useState } from 'react';
export default function useSearch(ingredients) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const controllerRef = useRef();

  useEffect(() => {
    if (!ingredients || ingredients.length === 0) {
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
      setError(null);

      try {
        const promises = ingredients.map(token => RecipeApi.getRecipeByIngredient(token, signal));
        const settled = await Promise.allSettled(promises);
        const lists = settled.map(list => (list.status === 'fulfilled' ? list.value : []));
        const final = intersectAll();

        function intersectAll() {
          if (!lists) return [];
          let finalList = lists[0].data;
          for (let l = 1; l < lists.length; l++) {
            finalList = intersectList(finalList, lists[l].data);
            if (finalList.length === 0) break;
          }
          return finalList;
        }

        function intersectList(list1, list2) {
          if (!list1 || !list2) return [];
          const ids = new Set(list2.map(r => r.id));
          return list1.filter(r => ids.has(r.id));
        }
        setData(final || []);
      } catch (err) {
        if (err.name === 'AbortError') {
          return;
        }
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
  }, [ingredients]);
  return { data, loading, error };
}

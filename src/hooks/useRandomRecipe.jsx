import * as RecipeApi from '@apis/Recipe.jsx';
import { useEffect, useRef, useState } from 'react';
export default function useRandomRecipe(count) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const controllerRef = useRef();

  useEffect(() => {
    if (!count) {
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
        const promises = new Array(count).fill(' ').map(() => RecipeApi.getRandomRecipe(signal));
        const settled = await Promise.allSettled(promises);
        const list = settled.map(list => (list.status === 'fulfilled' ? list.value.data : []));
        setData(list);
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
  }, [count]);
  return { data, loading, error };
}

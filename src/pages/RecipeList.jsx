import RecipeCard from '@/components/RecipeCard.jsx';
import useSearch from '@/hooks/useSearch';
import styles from '@styles/List.module.css';
import { useMemo } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import loadingSVG from '/assets/loading.svg';

export default function RecipeList() {
  const [searchParams] = useSearchParams();
  const ingredientsParam = searchParams.get('ingredients');

  const ingredients = useMemo(() => {
    return ingredientsParam
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);
  }, [ingredientsParam]);
  const { data, loading, error } = useSearch(ingredients);
  if (!ingredientsParam) {
    return <Navigate to="/" />;
  }
  if (error) return <div>Error Ocurred</div>;
  if (loading)
    return (
      <div className="loader">
        <img src={loadingSVG} alt="" />
      </div>
    );
  if (!data || data.length === 0) return <div>No recipes found for those ingredients.</div>;

  return (
    <div className={styles['outer-container']}>
      <div className={styles['list-container']}>
        <h3>Recipes for you</h3>
        <div className={styles['list']}>
          {data.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}

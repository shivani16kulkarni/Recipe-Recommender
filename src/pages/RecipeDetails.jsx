import useRecipeDetail from '@/hooks/useRecipeDetail';
import { FavoritesContext } from '@contexts/FavoritesContext';
import styles from '@styles/RecipeDetails.module.css';
import { Heart } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import loadingSVG from '/assets/loading.svg';
export default function RecipeDetails() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const { data, loading, error } = useRecipeDetail(id);
  const { isFavorite, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const [favorite, setFavorite] = useState(false);
  useEffect(() => {
    if (!data) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavorite(isFavorite(data.id));
  }, [data?.id]); //

  function toggleFavorites() {
    if (favorite) {
      setFavorite(false);
      removeFromFavorites(data);
    } else {
      setFavorite(true);
      addToFavorites(data);
    }
  }
  if (!id) {
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
    <div className={styles['recipe-details-container']}>
      <div className={styles['recipe-details']}>
        <div className={styles['title']}>
          <h2>{data.title}</h2>
          <div className={styles['pills-favorites']}>
            <span className={styles['pills']}>{data.category}</span>
            <span className={styles['pills']}>{data.cuisine}</span>
            <button className={styles['btn-favorites']} onClick={toggleFavorites} type="button">
              <Heart className={favorite ? styles['solid-fill'] : styles['transparent-fill']} />
            </button>
          </div>
        </div>
        <div>
          <div className={styles['thumbnail']}>
            <img src={data.img} alt="" />
          </div>
        </div>

        <div className={styles['ingredients-instructions']}>
          <div className={styles['ingredients']}>
            <h4>Ingredients</h4>
            <ul>
              {data.ingredients.map(i => (
                <li>{i}</li>
              ))}
            </ul>
          </div>
          <div className={styles['instructions']}>
            <h4>Instructions</h4>
            <ol>
              {data.instructions.map(i => (
                <li>{i}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

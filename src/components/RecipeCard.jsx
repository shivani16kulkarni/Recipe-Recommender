import { FavoritesContext } from '@/contexts/FavoritesContext';
import styles from '@styles/RecipeCard.module.css';
import { Heart } from 'lucide-react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function RecipeCard({ recipe }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const [favorite, setFavorite] = useState(isFavorite(recipe.id));
  const navigate = useNavigate();
  function handleViewRecipe() {
    if (recipe.id) navigate(`/recipe-details?id=${recipe.id}`);
  }
  function toggleFavorites() {
    if (favorite) {
      setFavorite(false);
      removeFromFavorites(recipe);
    } else {
      setFavorite(true);
      addToFavorites(recipe);
    }
  }
  return (
    <div className={styles['recipe-card-container']}>
      <div className={styles['card-image']}>
        <img src={recipe.img} alt="" />
      </div>

      <div className={styles['card-content']}>
        <h4>{recipe.title}</h4>
        <div className={styles['buttons-container']}>
          <button className={styles['btn-view']} onClick={handleViewRecipe} type="button">
            View Recipe
          </button>
          <button className={styles['btn-favorites']} onClick={toggleFavorites} type="button">
            <Heart className={favorite ? styles['solid-fill'] : styles['transparent-fill']} />
          </button>
        </div>
      </div>
    </div>
  );
}

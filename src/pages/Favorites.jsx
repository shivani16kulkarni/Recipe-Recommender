import RecipeCard from '@components/RecipeCard';
import { FavoritesContext } from '@contexts/FavoritesContext.jsx';
import styles from '@styles/List.module.css';
import { useContext } from 'react';
function Favorites() {
  const { favorites } = useContext(FavoritesContext);
  return (
    <div className={styles['outer-container']}>
      <div className={styles['list-container']}>
        <h3>Favorites</h3>
        <div className={styles['list']}>
          {favorites.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;

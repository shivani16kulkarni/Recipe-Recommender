import RecipeCard from '@/components/RecipeCard';
import useRandomRecipe from '@/hooks/useRandomRecipe';
import styles from '@styles/Home.module.css';
import listStyle from '@styles/List.module.css';
import { useState } from 'react';
import loadingSVG from '/assets/loading.svg';

function HomePage() {
  const [count] = useState(4);
  const { data, loading, error } = useRandomRecipe(count);

  if (error) return <div>Error Ocurred</div>;
  if (loading)
    return (
      <div className="loader">
        <img src={loadingSVG} alt="" />
      </div>
    );
  if (!data || data.length === 0) return <div>No recipes found</div>;

  return (
    <div className={styles['home-container']}>
      <div className={styles['banner-container']}>
        <div className={styles['banner-content']}>
          <div className={styles['banner-image']}></div>
          <div className={styles['banner-text']}>
            <h2>SEARCH</h2>
            <p> the ingredients you have on hand</p>

            <h2>DISCOVER </h2>
            <p>meals that fit your ingredients</p>

            <h2>COOK </h2>
            <p>something delicious</p>
          </div>
        </div>
        <div className={listStyle['outer-container']}>
          <div className={listStyle['list-container']}>
            <h3>Today's recommendations for you</h3>
            <div className={listStyle['list']}>
              {data.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

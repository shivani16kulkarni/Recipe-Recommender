import { useState } from 'react';
import { FavoritesContext } from './FavoritesContext';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(getStorageData() || []);

  const addToFavorites = function (recipe) {
    setFavorites(prev => [...prev, recipe]);
    setStorageData(favorites);
  };
  const removeFromFavorites = function (recipe) {
    console.log(recipe, 'recipe');
    const newf = favorites.filter(p => p.id !== recipe.id);
    console.log(newf);
    setFavorites(newf);
    setStorageData(favorites);
  };
  const isFavorite = function (id) {
    return favorites.find(f => f.id === id) ? true : false;
  };
  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
function setStorageData(storage) {
  localStorage.setItem('storage', JSON.stringify(storage));
}
function getStorageData() {
  const raw = localStorage.getItem('storage');

  if (!raw) return [];

  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed)) return [];

  return Array.from(parsed);
}

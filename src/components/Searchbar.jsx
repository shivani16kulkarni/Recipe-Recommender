import styles from '@styles/Searchbar.module.css';
import { Search } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Searchbar() {
  const [searchValue, setSearchValue] = useState('');
  const lastQueryRef = useRef('');

  const navigate = useNavigate();

  function handleSearchInputChange(event) {
    setSearchValue(event.target.value);
  }
  function handleClick() {
    handleSearch();
  }
  function handleKeyDown(event) {
    if (event.key === 'Enter') handleSearch();
  }
  const query = useMemo(() => {
    const removeNonLetters = searchValue.replace(/[^a-zA-Z ]/g, '');
    const cleaned = removeNonLetters
      .toLowerCase()
      .split(' ')
      .map(t => t.trim())
      .filter(Boolean);
    const removeDupes = [...new Set(cleaned)];
    const sorted = removeDupes.sort().join(',');
    return sorted;
  }, [searchValue]);

  function handleSearch() {
    if (query === lastQueryRef.current) {
      return;
    }
    lastQueryRef.current = query;
    if (!query.length) return;
    navigate(`/recipe-list?ingredients=${query}`);
  }

  return (
    <>
      <div className={styles['searchbar-container']}>
        <input
          placeholder="Search Ingredients, Find Recipes"
          type="text"
          className={styles['searchbar']}
          onChange={handleSearchInputChange}
          onKeyDown={handleKeyDown}
          value={searchValue}
        />
        <button type="button" onClick={handleClick} className={styles['search-button']}>
          <Search className={styles['search-icon']} />
        </button>
      </div>
    </>
  );
}

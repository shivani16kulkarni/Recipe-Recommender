import Searchbar from '@/components/Searchbar.jsx';
import styles from '@styles/Header.module.css';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  function handleNavClose() {
    setIsOpen(false);
  }

  function handleNavOpen() {
    setIsOpen(true);
  }
  return (
    <>
      <header className={styles['header-container']}>
        <div className={styles['logo-heading-container']}>
          <button type="button" className={styles['btn']} onClick={handleNavOpen}>
            <Menu className={styles['icon']} />
          </button>
          <h1>
            <span className={styles['italic']}>r</span>ecipe{' '}
            <span className={styles['italic']}>r</span>ecommender
          </h1>

          <aside className={[styles['nav-list'], isOpen ? styles.open : styles.close].join(' ')}>
            <div className={styles['nav-logo-heading-container']}>
              <button type="button" onClick={handleNavClose} className={styles['btn']}>
                <X className={styles['icon']} />
              </button>
              <h1>
                <span className={styles['italic']}>r</span>ecipe{' '}
                <span className={styles['italic']}>r</span>ecommender
              </h1>
            </div>
            <nav>
              <ul>
                <li>
                  <Link
                    onClick={() => {
                      handleNavClose();
                    }}
                    to="/"
                  >
                    HOME
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      handleNavClose();
                    }}
                    to="/favorites"
                  >
                    FAVORITES
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
        <Searchbar />
      </header>
    </>
  );
}

export default Header;

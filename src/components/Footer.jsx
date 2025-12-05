import styles from '@styles/Footer.module.css';

function Footer() {
  return (
    <footer className={styles['footer-container']}>
      <div className={styles['left']}>
        <h2>
          <span className={styles['italic']}>r</span>ecipe{' '}
          <span className={styles['italic']}>r</span>
          ecommender <span className={styles['small']}>by Shivani</span>
        </h2>
      </div>
      <div className={styles['right']}>
        <p>
          A basic recipe recommender website built with React as a practise project. You may spot a
          few bugs and gaps while I experiment and improve.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

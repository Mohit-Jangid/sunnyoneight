import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faInstagram, faSpotify } from '@fortawesome/free-brands-svg-icons';
import styles from './footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>SUNNYONEIGHT</div>
      <nav className={styles.navLinks}>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
      <div className={styles.socialMediaIcons}>
        <a href="https://www.youtube.com/@sunnyoneight" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
        <a href="https://www.instagram.com/sunnyoneight/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://open.spotify.com/artist/0NAGtH4ZiNDSBVLZmSrVYF" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
          <FontAwesomeIcon icon={faSpotify} />
        </a>
      </div>
      <div className={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} SUNNYONEIGHT</p>
      </div>
    </footer>
  );
};

export default Footer;

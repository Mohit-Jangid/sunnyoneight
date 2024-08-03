
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faInstagram, faSpotify } from '@fortawesome/free-brands-svg-icons';
import styles from './header.module.css';


const Header: React.FC = () => {

    return (
    
    <header className={styles.header} role="banner">
        <div className={styles.logo} aria-label="Sunnyoneight Homepage">SUNNYONEIGHT</div>
            <nav className={styles['social-media-icons']} aria-label="Social Media Links">
                <a href="https://www.youtube.com/@sunnyoneight" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a href="https://www.instagram.com/sunnyoneight/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://open.spotify.com/artist/0NAGtH4ZiNDSBVLZmSrVYF" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
                <FontAwesomeIcon icon={faSpotify} />
                </a>
            </nav>
    </header>
  );
};

export default Header;

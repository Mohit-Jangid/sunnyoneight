import React from 'react';
import styles from './musicPoster.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons';

interface MusicPosterProps {
  id: string;
  title: string;
  artist: string;
  url: string;
  poster: string;
  spotify: string;
  youtube: string;
}

const MusicPoster: React.FC<MusicPosterProps> = ({ title, poster, spotify, youtube }) => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.title}>{title}</div>
        <img src={poster} alt={title} className={styles.poster} />
        <div className={styles.icons}>
          <a href={spotify} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faSpotify} />
          </a>
          <a href={youtube} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MusicPoster;

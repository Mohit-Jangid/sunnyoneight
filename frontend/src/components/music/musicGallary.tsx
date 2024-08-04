import React, { useState, useEffect } from 'react';
import MusicPoster from './musicPoster';
import styles from './musicPoster.module.css';

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  poster: string;
  spotify: string;
  youtube: string;
}

const MusicGallery: React.FC = () => {
  const [musicData, setMusicData] = useState<Track[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tracks`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Track[] = await response.json();
        setMusicData(data);
      } catch (error) {
        setError('Error fetching tracks. Please try again later.');
        console.error('Error fetching tracks:', error);
      }
    };

    fetchTracks();
  }, []);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.musicGalleryContainer}>
      <div className={styles.musicGallery}>
        {musicData.map((music) => (
          <MusicPoster
            key={music.id}
            id={music.id}
            title={music.title}
            artist={music.artist}
            url={music.url}
            poster={music.poster}
            spotify={music.spotify}
            youtube={music.youtube}
          />
        ))}
      </div>
    </div>
  );
};

export default MusicGallery;

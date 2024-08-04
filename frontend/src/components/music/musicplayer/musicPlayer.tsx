import React, { useRef, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faPlay, faPause, faStepBackward, faStepForward, faHeart, faRandom, faRedo } from '@fortawesome/free-solid-svg-icons';
import styles from './musicPlayer.module.css';

interface MusicPlayerProps {
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  poster: string;
  spotify: string;
  youtube: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = () => {
  const [isSideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [isSearchBarOpen, setSearchBarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const [musicData, setMusicData] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sideDrawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    const fetchMusicData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tracks`);
        const data: Track[] = await response.json();
        setMusicData(data);
        if (data.length > 0) {
          setCurrentTrack(data[0]); 
        }
      } catch (error) {
        console.error('Error fetching music data:', error);
      }
    };

    fetchMusicData();
  }, []);

  useEffect(() => {
 
    if (audioRef.current && currentTrack) {
      audioRef.current.play();
      setPlaying(true);
    }
  }, [currentTrack]);
  

  useEffect(() => {
    if (audioRef.current) {
      const updateProgress = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      };

      audioRef.current.addEventListener('timeupdate', updateProgress);
      return () => audioRef.current?.removeEventListener('timeupdate', updateProgress);
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      const handleLoadedMetadata = () => {
        setDuration(audioRef.current?.duration || 0);
      };
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        audioRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [currentTrack]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sideDrawerRef.current && !sideDrawerRef.current.contains(event.target as Node)) {
        setSideDrawerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSearchBar = () => {
    setSearchBarOpen(prevState => {
      if (!prevState) setSideDrawerOpen(false);
      return !prevState;
    });
  };

  const toggleSideDrawer = () => {
    setSideDrawerOpen(prevState => {
      if (!prevState) setSearchBarOpen(false);
      return !prevState;
    });
  };

  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * (audioRef.current?.duration || 0);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime || 0);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlaying(!isPlaying);
    }
  };
  

  const playPreviousTrack = () => {
    const currentIndex = musicData.findIndex(track => track.id === currentTrack?.id);
    const previousIndex = (currentIndex === 0) ? musicData.length - 1 : currentIndex - 1;
    setCurrentTrack(musicData[previousIndex]);
    setCurrentTime(0);
  };

  const playNextTrack = () => {
    const currentIndex = musicData.findIndex(track => track.id === currentTrack?.id);
    const nextIndex = (currentIndex === musicData.length - 1) ? 0 : currentIndex + 1;
    setCurrentTrack(musicData[nextIndex]);
    setCurrentTime(0);
  };

  const filteredTracks = musicData.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSearchResults(filteredTracks);
  };

  const handleSearchResultClick = (track: Track) => {
    setCurrentTrack(track);
    setSearchBarOpen(false);
    setSearchResults([]);
  };

  const handleTrackClick = (track: Track) => {
    setCurrentTrack(track);
    setSideDrawerOpen(false);
  };

  return (
    <div className={styles.musicPlayer}>
      <header className={styles.header}>
        <FontAwesomeIcon 
          icon={faBars} 
          className={`${styles.barsIcon} ${isSideDrawerOpen ? styles.barsIconMoved : ''}`} 
          onClick={toggleSideDrawer} 
        />
        <FontAwesomeIcon 
          icon={faSearch} 
          className={styles.searchIcon} 
          onClick={toggleSearchBar} 
        />
      </header>

      {isSearchBarOpen && (
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search tracks..."
            className={`${styles.searchBar} ${styles.animated}`}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <div className={styles.searchResultsDrawer}>
              {searchResults.map(result => (
                <div 
                  key={result.id} 
                  className={styles.searchResultItem}
                  onClick={() => handleSearchResultClick(result)}
                >
                  {result.title}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {isSideDrawerOpen && (
        <div className={`${styles.sideDrawer} ${styles.animated}`} ref={sideDrawerRef}>
          <ul className={styles.trackList}>
            {musicData.map(track => (
              <li 
                key={track.id} 
                onClick={() => handleTrackClick(track)} 
                className={styles.trackItem}
              >
                {track.title} - {track.artist}
              </li>
            ))}
          </ul>
        </div>
      )}

      {currentTrack && (
        <div className={styles.playerArea}>
          <div 
            className={styles.songPoster} 
            style={{ backgroundImage: `url(${currentTrack.poster})` }} 
          ></div>
          <div className={styles.songInfo}>
            <h3>{currentTrack.title}</h3>
            <h4>{currentTrack.artist}</h4>
          </div>
          <input
            type="range"
            className={styles.progressBar}
            value={(currentTime / (duration || 1)) * 100}
            onChange={handleProgressBarChange}
          />
          <div className={styles.timeInfo}>
            <span>{Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}</span>
            <span>{Math.floor((duration || 0) / 60)}:{String(Math.floor((duration || 0) % 60)).padStart(2, '0')}</span>
          </div>

          <div className={styles.controls}>
        <FontAwesomeIcon 
          icon={faStepBackward} 
          className={styles.controlIcon} 
          onClick={playPreviousTrack} 
        />
        <FontAwesomeIcon
          icon={isPlaying ? faPause : faPlay}
          className={styles.controlIcon}
          onClick={togglePlayPause}
        />

        <FontAwesomeIcon 
          icon={faStepForward} 
          className={styles.controlIcon} 
          onClick={playNextTrack} 
        />
      </div>

      <audio
        ref={audioRef}
        src={currentTrack?.url}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={playNextTrack}
      />

      <footer className={styles.footer}>
        <FontAwesomeIcon icon={faHeart} className={styles.footerIcon} />
        <FontAwesomeIcon icon={faRandom} className={styles.footerIcon} />
        <FontAwesomeIcon icon={faRedo} className={styles.footerIcon} />
      </footer>
    </div>
  )}
  </div>
  );
};

export default MusicPlayer;

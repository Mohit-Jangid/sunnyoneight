import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faTimes  } from '@fortawesome/free-solid-svg-icons';
import MusicPlayer from './musicPlayer';
import styles from './musicPlayerIcon.module.css';

const MusicPlayerIcon: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <div className={styles.iconContainer} onClick={toggleDrawer}>
        <FontAwesomeIcon icon={faMusic} className={styles.icon} />
      </div>
      <div
        className={`${styles.drawer} ${isDrawerOpen ? styles.drawerOpen : ''}`}
      >
        <div className={styles.drawerContent}>
          <div className={styles.closeIconContainer}>
            <FontAwesomeIcon icon={faTimes} className={styles.closeIcon} onClick={() => setDrawerOpen(false)} />
          </div>
          {isDrawerOpen && <MusicPlayer setDrawerOpen={setDrawerOpen} />}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayerIcon;

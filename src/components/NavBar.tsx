import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from '../styles/NavBar.module.scss';
import Tile from '../components/Tile';
import Logo from './Logo';

type NavBarProps = {
  handleOpenInfoModal: () => void;
  handleOpenSettingsModal: () => void;
}

function NavBar({
  handleOpenInfoModal,
  handleOpenSettingsModal,
}: NavBarProps) {
  return (
    <div className= {styles.bar}>
      <div className={styles.barContent}>
        <div style={{
          alignItems: 'center',
          display: 'flex',
          paddingRight: '2.5rem',
        }}>
          <GitHubIcon
            className={styles.github}
            onClick={() => {
              window.open('https://github.com/ktnguy20/wordhunt-reactapp');
            }}/>
        </div>
        <div className={styles.logo}>
          <Logo/>
        </div>
        <div style={{
          alignItems: 'center',
          display: 'flex',
          paddingLeft: '2.5rem',
        }}>
          <HelpOutlineIcon
            className={styles.info}
            onClick={handleOpenInfoModal}
          />
          <SettingsIcon
            className={styles.settings}
            onClick={handleOpenSettingsModal}
          />
        </div>
      </div>
    </div>
  );
}

export default NavBar;

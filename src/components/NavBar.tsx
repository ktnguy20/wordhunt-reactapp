import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from '../styles/NavBar.module.scss';
import Logo from './Logo';

type NavBarProps = {
  handleOpenInfoModal: () => void;
  handleOpenSettingsModal: () => void;
  darkMode: boolean;
}

function NavBar({
  handleOpenInfoModal,
  handleOpenSettingsModal,
  darkMode,
}: NavBarProps) {
  return (
    <div className={styles.barWrapper}>
      <div className = {styles.githubContainer}>
        <GitHubIcon
          className={styles.github}
          onClick={() => {
            window.open('https://github.com/ktnguy20/wordhunt-reactapp');
          }}/>
        <GitHubIcon
          style={{visibility: 'hidden'}}
          className={styles.github}
          onClick={() => {
            window.open('https://github.com/ktnguy20/wordhunt-reactapp');
          }}/>
      </div>
      <div className={styles.logo}>
        <Logo darkMode = {darkMode}/>
      </div>
      <div className = {styles.infoSettingsContainer}>
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
  );
}

export default NavBar;

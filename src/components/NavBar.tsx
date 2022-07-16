import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from '../styles/NavBar.module.scss';

type NavBarProps = {
  handleOpenInfoModal: () => void;
  handleOpenSettingsModal: () => void;
}

function NavBar({
  handleOpenInfoModal,
  handleOpenSettingsModal,
}: NavBarProps) {
  return (
    <div style = {{}}>
      <GitHubIcon
        className = {styles.github}
        onClick = {() => {
          location.href = 'https://github.com/ktnguy20/wordhunt-reactapp';
        }}
      />
      <HelpOutlineIcon
        className = {styles.info}
        onClick = {handleOpenInfoModal}
      />
      <SettingsIcon
        className = {styles.settings}
        onClick = {handleOpenSettingsModal}
      />
    </div>
  );
}

export default NavBar;

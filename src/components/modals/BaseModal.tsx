import React from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styles from '../../styles/BaseModal.module.scss';

type BaseModalProps = {
  isOpen: boolean;
  handleClose?: () => void;
  children: React.ReactNode;
  darkMode: boolean;
}

function BaseModal({isOpen, handleClose, children, darkMode}: BaseModalProps) {
  return (
    <div>
      <Modal
        open = {isOpen}
        onClose = {handleClose}
        closeAfterTransition
      >
        <Fade in = {isOpen}>
          <Box className =
            {`${styles.modalBody} ${styles[darkMode ? 'dark' : 'light']}`}
          >
            {handleClose &&
              <HighlightOffIcon
                className = {styles.closeIcon}
                onClick = {handleClose}
              />
            }
            {children}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default BaseModal;

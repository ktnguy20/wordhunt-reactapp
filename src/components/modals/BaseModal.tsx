import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styles from '../../styles/BaseModal.module.scss';

type BaseModalProps = {
  isOpen: boolean;
  handleClose?: () => void;
  children: React.ReactNode;
}

function BaseModal({isOpen, handleClose, children}: BaseModalProps) {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: 24,
    p: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyItems: 'center',
    outline: 'none',
  };

  return (
    <div>
      <Modal
        open= {isOpen}
        onClose= {handleClose}
        closeAfterTransition
        BackdropComponent= {Backdrop}
        BackdropProps= {{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
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

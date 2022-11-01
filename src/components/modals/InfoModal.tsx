import React from 'react';
import styles from '../../styles/InfoModal.module.scss';
import BaseModal from './BaseModal';

type InfoModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleStart: () => void;
  isActive: boolean;
  isStart: boolean;
  darkMode: boolean;
}

function InfoModal({
  isOpen,
  handleClose,
  handleStart,
  isActive,
  isStart,
  darkMode,
}: InfoModalProps) {
  return (
    <BaseModal
      isOpen = {isOpen}
      handleClose = {!isStart ? handleClose : undefined}
    >
      <p> Hello</p>
      <div>
        <p>
          This is how you play the game
        </p>
      </div>
      {isStart ?
        <button className = {styles.playButton} onClick = {() => {
          handleStart();
          handleClose();
        }}>
          {'Start Game'}
        </button> :
        null
      }
    </BaseModal>
  );
}

export default InfoModal;

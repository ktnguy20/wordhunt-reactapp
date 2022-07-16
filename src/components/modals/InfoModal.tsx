import React from 'react';
import BaseModal from './BaseModal';

type InfoModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleStart: () => void;
  isActive: boolean;
}

function InfoModal({
  isOpen,
  handleClose,
  handleStart,
  isActive,
}: InfoModalProps) {
  return (
    <BaseModal
      isOpen = {isOpen}
      handleClose = {handleClose}
    >
      <p> Hello</p>
      <div>
        <p>
          This is how you play the game
        </p>
      </div>
      {!isActive ?
        <button onClick = {() => {
          handleStart();
          handleClose();
        }}>
          Start Game
        </button> :
        null
      }
    </BaseModal>
  );
}

export default InfoModal;

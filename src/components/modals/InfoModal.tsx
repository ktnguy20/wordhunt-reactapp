import React from 'react';
import BaseModal from './BaseModal';

type InfoModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleStart: () => void;
  isActive: boolean;
  isStart: boolean;
}

function InfoModal({
  isOpen,
  handleClose,
  handleStart,
  isActive,
  isStart,
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

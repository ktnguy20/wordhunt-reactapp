import React from 'react';
import BaseModal from './BaseModal';

type InfoModalProps = {
  isOpen: boolean;
  handleClose: () => void;
}

function InfoModal({isOpen, handleClose}: InfoModalProps) {
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
    </BaseModal>
  );
}

export default InfoModal;

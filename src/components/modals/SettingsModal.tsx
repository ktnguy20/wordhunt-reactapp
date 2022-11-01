import React from 'react';
import BaseModal from './BaseModal';

type SettingsModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  darkMode: boolean;
}

function SettingsModal({isOpen, handleClose}: SettingsModalProps) {
  return (
    <BaseModal
      isOpen = {isOpen}
      handleClose = {handleClose}
    >
      Settings
    </BaseModal>
  );
}

export default SettingsModal;

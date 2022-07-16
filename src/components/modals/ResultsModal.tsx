import React from 'react';
import BaseModal from './BaseModal';

type ResultsModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  wordHistory: string[];
}

function ResultsModal({isOpen, handleClose, wordHistory}: ResultsModalProps) {
  return (
    <BaseModal
      isOpen = {isOpen}
      handleClose = {handleClose}
    >
      Results
      <div>
        {wordHistory.map((word: string, idx: number) =>
          <div key = {idx}>{word}</div>,
        )}
      </div>
    </BaseModal>
  );
}

export default ResultsModal;

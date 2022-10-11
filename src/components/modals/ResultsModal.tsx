import React from 'react';
import BaseModal from './BaseModal';

type ResultsModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  score: number;
  wordHistory: string[];
  handleRestart: () => void;
  setIsInfoModalOpen: (bool: boolean) => void;
}

function ResultsModal({
  isOpen,
  handleClose,
  handleRestart,
  score,
  wordHistory,
  setIsInfoModalOpen,
}: ResultsModalProps) {
  return (
    <BaseModal
      isOpen = {isOpen}
    >
      Results
      <div>
        You scored {score} points
        {wordHistory.map((word: string, idx: number) =>
          <div key = {idx}>{word}</div>,
        )}
      </div>
      <button onClick = {() => {
        handleRestart();
        handleClose();
      }}> Play Again </button>
    </BaseModal>
  );
}

export default ResultsModal;

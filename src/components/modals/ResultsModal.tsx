import React from 'react';
import BaseModal from './BaseModal';
import styles from '../../styles/ResultsModal.module.scss';

type ResultsModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  score: number;
  wordHistory: string[];
  handleRestart: () => void;
  setIsInfoModalOpen: (bool: boolean) => void;
  darkMode: boolean;
}

function ResultsModal({
  isOpen,
  handleClose,
  handleRestart,
  score,
  wordHistory,
  setIsInfoModalOpen,
  darkMode,
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
      <button className = {styles.replayButton} onClick = {() => {
        handleRestart();
        handleClose();
      }}> Play Again </button>
    </BaseModal>
  );
}

export default ResultsModal;

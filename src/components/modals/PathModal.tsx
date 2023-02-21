import React from 'react';
import BaseModal from './BaseModal';
import TileGrid from '../TileGrid';
import TileStatus from '../../data/TileStatus';
import styles from '../../styles/PathModal.module.scss';

type PathModalProps = {
  isOpen: boolean;
  darkMode: boolean;
  handleClose: () => void;
  gridArr: string[][];
  size: number;
  path: {row: number, col: number}[];
}

function PathModal({
  isOpen,
  darkMode,
  handleClose,
  gridArr,
  size,
  path,
}: PathModalProps) {
  return (
    <BaseModal
      isOpen = {isOpen}
      handleClose = {handleClose}
      darkMode = {darkMode}
    >
      <div className = {styles.gridWrapper}>
        <TileGrid
          gridArr = {gridArr}
          size = {size}
          onTileDown = {() => null}
          onTileEnter = {() => null}
          path = {path?.map((x) => (x.row*size)+x.col)}
          showDirection = {true}
          tileStatus = {TileStatus.valid}
          darkMode = {darkMode}
          isInfo
        />
      </div>
    </BaseModal>
  );
}

export default PathModal;

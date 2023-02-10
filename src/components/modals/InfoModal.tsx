import React, {useEffect} from 'react';
import styles from '../../styles/InfoModal.module.scss';
import TileGrid from '../TileGrid';
import BaseModal from './BaseModal';
import TileStatus from '../../data/TileStatus';

type InfoModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleStart: () => void;
  isActive: boolean;
  isStart: boolean;
  darkMode: boolean;
}

const infoTileGridArray = [
  ['W', 'O', 'R', 'D'],
  ['I', 'P', 'L', 'I'],
  ['T', 'A', 'Y', 'E'],
  ['H', 'U', 'N', 'T'],
];

function InfoModal({
  isOpen,
  handleClose,
  handleStart,
  isActive,
  isStart,
  darkMode,
}: InfoModalProps) {
  useEffect(() => {
    console.log('info modal render');
  });

  return (
    <BaseModal
      isOpen = {isOpen}
      handleClose = {!isStart ? handleClose : undefined}
      darkMode = {darkMode}
    >
      <h3> How to Play: </h3>
      <div style = {{
        textAlign: 'center',
        color: darkMode ? '#79f1a1': '#67827e',
        marginBottom: '2rem',
        fontWeight: darkMode ? 'lighter': 'normal',
      }}>
        <a>Create as many words are you can before time runs out!</a>
        <br/>
        <a> On a computer, use a mouse to connect the tiles. </a>
        <br/>
        <a> On mobile devices, drag between tiles with your finger.</a>
      </div>
      <>
        <TileGrid
          darkMode = {darkMode}
          gridArr = {infoTileGridArray}
          size = {4}
          onTileDown = {() => null}
          onTileEnter = {() => null}
          path = {[5, 6, 9, 10]}
          showDirection = {true}
          tileStatus = {TileStatus.valid}
          isInfo
        />
      </>
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

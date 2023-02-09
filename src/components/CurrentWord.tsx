import React, {memo} from 'react';
import {Paper} from '@mui/material';
import styles from '../styles/CurrentWord.module.scss';

type CurrentWordProps = {
  currentWord: string,
  tileStatus: string,
  prevTileStatus: string,
  score?: number,
  isPointerDown: boolean,
  darkMode: boolean,
}
const CurrentWord = memo(
    function CurrentWord({
      currentWord,
      prevTileStatus,
      tileStatus,
      score,
      isPointerDown,
      darkMode,
    }: CurrentWordProps) {
      return (
        <div className = {styles.wordContainer}>
          <Paper
            square
            elevation = {12}
            className = {
              `${styles.wordWrapper} ` +
              // eslint-disable-next-line max-len
              `${styles[`${darkMode ? `dark`: `light`}_${isPointerDown ? tileStatus: prevTileStatus}`]} ` +
              `${!isPointerDown ? styles[`animation_${prevTileStatus}`]: ''}`
            }
          >
            {
              currentWord.length !== 0 &&
                <div className = {styles.textWrapper}>
                  {currentWord + (score !== 0 ? ` (+${score})` : '')}
                </div>
            }
          </Paper>
        </div>
      );
    },
);

export default CurrentWord;

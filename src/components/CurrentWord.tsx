import React from 'react';
import {Paper} from '@mui/material';
import styles from '../styles/CurrentWord.module.scss';

type CurrentWordProps = {
  currentWord: string,
  tileStatus: string,
  score?: number,
  animation?: string,
  darkMode: boolean,
}
function CurrentWord({
  currentWord,
  tileStatus,
  score,
  animation,
  darkMode,
}: CurrentWordProps) {
  let containerColor;
  if (darkMode) {
    if (tileStatus === 'invalid') containerColor = styles.darkInvalid;
    else if (tileStatus === 'duplicate') containerColor = styles.darkDuplicate;
    else if (tileStatus === 'valid') containerColor = styles.darkValid;
  } else {
    if (tileStatus === 'invalid') containerColor = styles.lightInvalid;
    else if (tileStatus === 'duplicate') containerColor = styles.lightDuplicate;
    else if (tileStatus === 'valid') containerColor = styles.lightValid;
  }

  return (
    <div className = {styles.wordContainer}>
      <Paper
        square
        elevation = {12}
        className = {
          // eslint-disable-next-line max-len
          `${styles.wordWrapper} ${containerColor} ${animation ? styles[animation] : ''}`
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
}

export default CurrentWord;

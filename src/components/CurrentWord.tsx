import React from 'react';
import {Box, Paper} from '@mui/material';
import styles from '../styles/CurrentWord.module.scss';

type CurrentWordProps = {
  currentWord: string,
  tileStatus: string,
  score?: number,
  animation?: string,
}
function CurrentWord({
  currentWord,
  tileStatus,
  score,
  animation,
}: CurrentWordProps) {
  return (
    <Box
      style = {{height: '1.3em', marginBottom: '.5em', paddingBottom: '20px'}}
    >
      <Paper
        square
        elevation = {12}
        className = {
          `${styles.wordContainer} ${animation ? styles[animation] : ''}`
        }
        style = {{
          backgroundColor: `${tileStatus}`,
        }}
      >
        {
          currentWord.length !== 0 &&
            <div style = {{marginBottom: '4px'}}>
              {currentWord + (score !== 0 ? ` (+${score})` : '')}
            </div>
        }
      </Paper>
    </Box>
  );
}

export default CurrentWord;

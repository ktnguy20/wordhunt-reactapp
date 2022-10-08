import React from 'react';
import {Box, Paper} from '@mui/material';
import styles from '../styles/CurrentWord.module.scss';

type CurrentWordProps = {
  currentWord: string,
  tileStatus: string,
}
function CurrentWord({
  currentWord,
  tileStatus,
}: CurrentWordProps) {
  return (
    <Box
      style = {{height: '1.3em', marginBottom: '2vh'}}
    >
      <Paper
        square
        elevation = {12}
        className = {styles.wordContainer}
        style = {{
          backgroundColor: `${tileStatus}`,
        }}
      >
        <div style= {{marginBottom: '5px'}}>
          {currentWord + ` (+${2200})`}
        </div>
      </Paper>
    </Box>
  );
}

export default CurrentWord;

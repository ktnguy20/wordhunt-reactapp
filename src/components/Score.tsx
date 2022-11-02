import React from 'react';
import styles from '../styles/Score.module.scss';
import {Box, Paper} from '@mui/material';

type ScoreProps = {
  score: number;
  darkMode: boolean;
}
function Score({
  score,
  darkMode,
}: ScoreProps) {
  return (
    <div
      className = {styles.scoreContainer}
    >
      {`Score: ${score}`}
    </div>
  );
}

export default Score;

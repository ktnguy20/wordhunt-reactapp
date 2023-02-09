import React, {memo} from 'react';
import styles from '../styles/Score.module.scss';
import {Box, Paper} from '@mui/material';

type ScoreProps = {
  score: number;
  darkMode: boolean;
}
const Score = memo(
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
    },
);

export default Score;

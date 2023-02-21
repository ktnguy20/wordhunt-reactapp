import React, {memo} from 'react';
import styles from '../styles/Score.module.scss';

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
        <div className = {styles.scoreWrapper}>
          {`Score: ${score}`}
        </div>
      );
    },
);

export default Score;

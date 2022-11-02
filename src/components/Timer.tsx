import React from 'react';
import styles from '../styles/Timer.module.scss';

type TimerProps = {
  clockTime: number;
  darkMode: boolean;
}

function Timer({
  clockTime,
  darkMode,
}: TimerProps) {
  return (
    <div className = {styles.timer}>
      {clockTime}
    </div>
  );
}
export default Timer;

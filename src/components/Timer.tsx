import React from 'react';
import styles from '../styles/Timer.module.scss';

type TimerProps = {
  clockTime: number;
}

function Timer({clockTime}: TimerProps) {
  return (
    <div className = {styles.timer}>
      {clockTime}
    </div>
  );
}
export default Timer;

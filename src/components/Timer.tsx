import React from 'react';
import useCountdown from '../hooks/useCountdown';

type TimerProps = {
  onTimeout: () => void;
}

function Timer({onTimeout}: TimerProps) {
  const [clockTime, isPlaying, setIsPlaying] = useCountdown(
      parseInt('60', 10), true, onTimeout,
  );


  return (
    <div>
      {clockTime}
    </div>
  );
}
export default Timer;

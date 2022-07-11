import React from 'react';

type TimerProps = {
  clockTime: number;
}

function Timer({clockTime}: TimerProps) {
  return (
    <div>
      {clockTime}
    </div>
  );
}
export default Timer;

import React from 'react';
import {Box, Paper} from '@mui/material';

type ScoreProps = {
  score: number;
}
function Score({
  score,
}: ScoreProps) {
  return (
    <Paper
      elevation = {0}
      style = {{
        marginBottom: '2vh',
        height: '1.3em',
        backgroundColor: '#2d2e30',
        color: '#FFF',
      }}
    >
      {`Score: ${score}`}
    </Paper>
  );
}

export default Score;

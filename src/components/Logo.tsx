import React from 'react';
import Grid from '@mui/material/Grid';
import Tile from './Tile';
import Box from '@mui/material/Box';


function Logo() {
  const logo: string[] = 'WORD HUNT'.split('');

  return (
    <Box width = {'100%'}>
      <Grid container columns = {9} width = {'100%'}
        // spacing={{xs: 0.5, sm: 0.6, md: 0.7, lg: 0.8, xl: 0.9}}
      >
        {logo.map((letter: string, idx: number) => {
          return (
            <Grid item xs = {1} key={idx}>
              <Tile
                tileId = {9999}
                tileValue = {letter}
                onTileDown = {() => null}
                onTileEnter = {() => null}
                tileStatus = {'#50C878'}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Logo;

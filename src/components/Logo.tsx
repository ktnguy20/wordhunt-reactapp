import React from 'react';
import Grid from '@mui/material/Grid';
import Tile from './Tile';
import Box from '@mui/material/Box';
import styles from '../styles/NavBar.module.scss';
import TileStatus from '../data/TileStatus';

type LogoProps = {
  darkMode: boolean;
}

function Logo({
  darkMode,
}: LogoProps) {
  const logo: string[] = 'WORD HUNT'.split('');

  return (
    <Box className = {styles.logoAnimation} tabIndex = {0} width = {'100%'}>
      <Grid container columns = {9} width = {'100%'}>
        {logo.map((letter: string, idx: number) => {
          return (
            <Grid item xs = {1} key={idx}>
              <Tile
                tileId = {9999}
                tileValue = {letter}
                onTileDown = {() => null}
                onTileEnter = {() => null}
                darkMode = {darkMode}
                tileStatus = {TileStatus.logo}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Logo;

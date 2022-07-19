import React from 'react';
import Xarrow, {Xwrapper} from 'react-xarrows';
import Tile from './Tile';
import {createTheme} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import styles from '../styles/TileGrid.module.scss';


// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     color: theme.palette.text.secondary,
//   }));

type TileGridProps = {
    gridArr: string[];
    onTileDown: () => void;
    onTileEnter: (tileId: number, tileLetter: string) => void;
    path: number[];
    tileStatus: string;
}


function TileGrid({
  gridArr,
  onTileDown,
  onTileEnter,
  path,
  tileStatus,
}:TileGridProps) {
  return (
    <Box
      className = {styles.grid}
      width={{xs: .6, sm: .5, md: .25, lg: .2, xl: .15}}
    >
      <Grid container
        spacing={{xs: 1.00, sm: 1.25, md: 1.0, lg: 1.25, xl: 1.50}}
        className="unselectable"
      >
        <Xwrapper>
          {gridArr.map((letter: string, idx:number) => (
            <Tile
              key = {idx}
              tileId = {idx}
              tileValue = {letter}
              onTileDown = {onTileDown}
              onTileEnter = {onTileEnter}
              tileStatus = {path.includes(idx) ? tileStatus : undefined}
            />
          ))}
          {path.map((value: number, idx: number) => {
            if (idx == path.length-1) return;
            return (<Xarrow
              key = {idx}
              start={`${value}`}
              end = {`${path[idx+1]}`}
              showHead={false}
              path={'straight'}
              startAnchor={'middle'}
              endAnchor = {'middle'}
            />);
          })}
        </Xwrapper>
      </Grid>
    </Box>
  );
}

export default TileGrid;

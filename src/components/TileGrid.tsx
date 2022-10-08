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
    gridArr: string[][];
    size: number;
    onTileDown: () => void;
    onTileEnter: (tileId: number, tileLetter: string) => void;
    path: number[];
    tileStatus: string;
}


function TileGrid({
  gridArr,
  size,
  onTileDown,
  onTileEnter,
  path,
  tileStatus,
}:TileGridProps) {
  return (
    <Box
      className = {styles.grid}
      width={{xs: .75, sm: .5, md: .3, lg: .25, xl: .2}}
    >
      <Grid container
        spacing={{xs: 1.2, sm: 1.3, md: 1.4, lg: 1.25, xl: 1.50}}
        className="unselectable"
        paddingLeft={'5%'}
        paddingRight={'5%'}
        paddingTop={'5%'}
        paddingBottom={'5%'}
      >
        <Xwrapper>
          {gridArr.map((row: string[], rowIdx:number) => (
            row.map((letter: string, idx: number) => {
              const id: number = (size*rowIdx)+idx;
              return (
                <Grid item key = {id} xs={3}>
                  <Tile
                    tileId = {id}
                    tileValue = {letter}
                    onTileDown = {onTileDown}
                    onTileEnter = {onTileEnter}
                    tileStatus = {path.includes(id) ? tileStatus : undefined}
                  />
                </Grid>
              );
            })
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

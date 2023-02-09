import React, {memo} from 'react';
import Xarrow, {Xwrapper} from 'react-xarrows';
import Tile from './Tile';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import styles from '../styles/TileGrid.module.scss';
import TileStatus from '../data/TileStatus';

type TileGridProps = {
    darkMode: boolean;
    gridArr: string[][];
    size: number;
    onTileDown: (tileId: number, tileLetter: string) => void;
    onTileEnter: (tileId: number, tileLetter: string) => void;
    path: number[];
    showDirection: boolean;
    tileStatus: TileStatus;
}


const TileGrid = memo(
    function TileGrid({
      darkMode,
      gridArr,
      size,
      onTileDown,
      onTileEnter,
      path,
      showDirection,
      tileStatus,
    }: TileGridProps) {
      return (
        <Box
          className = {styles.grid}
        >
          <Grid container
            columns = {size}
            spacing={'2.5%'}
            className='unselectable'
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
                    <Grid item key = {id} xs={1}>
                      <Tile
                        tileId = {id}
                        tileValue = {letter}
                        onTileDown = {onTileDown}
                        onTileEnter = {onTileEnter}
                        tileStatus = {
                          path.includes(id) ? tileStatus : TileStatus.unvisited
                        }
                        darkMode = {darkMode}
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
                  showHead={showDirection}
                  path={'straight'}
                  startAnchor={'middle'}
                  endAnchor = {'middle'}
                />);
              })}
            </Xwrapper>
          </Grid>
        </Box>
      );
    },
);

export default TileGrid;

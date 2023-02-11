import React, {memo, useState, useEffect} from 'react';
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
    isInfo?: boolean;
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
      isInfo,
    }: TileGridProps) {
      const [renderCount, setRenderCount] = useState(1);

      useEffect(() => {
        // force 3 rerenders because xarrows doesn't work right
        if (isInfo && renderCount <= 3) {
          setRenderCount((renderCount) => renderCount+1);
        }
      });
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
                        tileId = {isInfo ? 500+id: id}
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
              {
              (!isInfo || renderCount > 1) ?
                path.map((value: number, idx: number) => {
                  if (idx == path.length-1) return;
                  return (<Xarrow
                    key = {idx+renderCount}
                    start={`${value+(isInfo ? 500: 0)}`}
                    end = {`${path[idx+1]+(isInfo ? 500: 0)}`}
                    path={'straight'}
                    startAnchor= {'middle'}
                    endAnchor = {'middle'}
                    color = {
                      showDirection ?
                        darkMode ? 'rgba(255,255,255,0.40)': 'rgba(0,0,0,0.40)':
                        darkMode ? 'rgba(0,0,0,0.70)': 'rgba(0,0,0,0.70)'
                    }
                    headColor = {
                      darkMode ? 'rgba(255,255,255,0.70)': 'rgba(0,0,0,0.60)'
                    }
                    animateDrawing={showDirection ? 0.8: 0}
                    headSize = {showDirection ? 3: 0}
                    strokeWidth = {5}
                    showXarrow = {!isInfo || renderCount > 2}
                  />);
                }) :
                null
              }
            </Xwrapper>
          </Grid>
        </Box>
      );
    },
);

export default TileGrid;

import React from 'react';

// import { styled } from '@mui/material/styles';
import Xarrow, {Xwrapper} from 'react-xarrows';
import Tile from './Tile';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './unselectable.css';


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
    <div
      className="unselectable"
      style={{justifyContent: 'center', display: 'flex'}}
    >
      <Box
        width={{xs: 0.6, sm: .5, md: .4, lg: .3, xl: .2}}
      >
        <Grid container
          spacing={{xs: 1, sm: 1.25, md: 1.5, lg: 1.75, xl: 2}}
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
                tileStatus = {path.includes(idx) ? tileStatus : 'aliceblue'}
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
    </div>
  );
}

export default TileGrid;

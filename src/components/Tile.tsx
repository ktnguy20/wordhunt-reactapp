import React, {MouseEvent} from 'react';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import './unselectable.css';
// import tileImages from '../data/LetterImages';
// import TileStatus from '../data/TileStatus';

type TileProps = {
    tileId: number;
    tileValue:number;
    setMouseDown: (bool: boolean) => void;
    onTileEnter: (tileId: number, tileLetter: string) => void;
    tileStatus: string;
}

function Tile({
  tileId,
  tileValue,
  setMouseDown,
  onTileEnter,
  tileStatus,
}: TileProps) {
  const letter = String.fromCharCode(65+tileValue);

  const TileContainer = styled(Paper)(() => ({
    backgroundColor: tileStatus,
    position: 'relative',
    height: '0',
    width: '100%',
    paddingBottom: '100%',
  }));

  const LetterContainer = styled(Box)(() => ({
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    top: '0',
    bottom: '0',
    borderRadius: '50%',
  }));


  const mouseEnterHandler = (event: MouseEvent<HTMLDivElement>) => {
    onTileEnter(tileId, letter);
  };

  const mouseDownHandler = (event: MouseEvent<HTMLDivElement>) => {
    setMouseDown(true);
    onTileEnter(tileId, letter);
  };

  return (
    <Grid item xs={3} className="unselectable">
      <div onMouseDown = {mouseDownHandler}>
        <TileContainer>
          <LetterContainer onMouseEnter = {mouseEnterHandler}>
            {letter}
          </LetterContainer>
        </TileContainer>
      </div>
    </Grid>
  );
}
export default Tile;

import React, {MouseEvent} from 'react';
import {styled} from '@mui/material/styles';
import styles from '../styles/Tile.module.scss';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

type TileProps = {
    tileId: number;
    tileValue:string;
    onTileDown: () => void;
    onTileEnter: (tileId: number, tileLetter: string) => void;
    tileStatus?: string;
}

function Tile({
  tileId,
  tileValue,
  onTileDown,
  onTileEnter,
  tileStatus,
}: TileProps) {
  const TileContainer = styled(Paper)(() => ({
    backgroundColor: tileStatus !== undefined ? tileStatus : '#E3CFAA',
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
    onTileEnter(tileId, tileValue);
  };

  const mouseDownHandler = (event: MouseEvent<HTMLDivElement>) => {
    onTileDown();
    onTileEnter(tileId, tileValue);
  };

  return (
    <Grid item xs={3}>
      <div
        className={tileStatus !== undefined ? styles.animation : ''}
        onMouseDown = {mouseDownHandler}
        id = {`${tileId}`}
      >
        <TileContainer elevation = {16}>
          <LetterContainer onMouseEnter = {mouseEnterHandler}>
            <div>
              {tileValue}
            </div>
          </LetterContainer>
        </TileContainer>
      </div>
    </Grid>
  );
}
export default Tile;

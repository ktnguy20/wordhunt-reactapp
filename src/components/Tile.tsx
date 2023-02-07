import React, {MouseEvent, PointerEvent} from 'react';
import styles from '../styles/Tile.module.scss';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TileStatus from '../data/TileStatus';

type TileProps = {
    tileId: number;
    tileValue:string;
    onTileDown: (tileId: number, tileLetter: string) => void;
    onTileEnter: (tileId: number, tileLetter: string) => void;
    tileStatus?: TileStatus;
    darkMode: boolean;
}

function Tile({
  tileId,
  tileValue,
  onTileDown,
  onTileEnter,
  tileStatus,
  darkMode,
}: TileProps) {
  let tileColor: string | undefined = undefined;

  if (darkMode) {
    if (!tileStatus) {
      tileColor = styles.darkLogo;
    } else if (tileStatus === 'unvisited') tileColor = styles.darkUnvisited;
    else if (tileStatus === 'invalid') tileColor = styles.darkInvalid;
    else if (tileStatus === 'duplicate') tileColor = styles.darkDuplicate;
    else if (tileStatus === 'valid') tileColor = styles.darkValid;
  } else {
    if (!tileStatus) tileColor = styles.lightLogo;
    else if (tileStatus === 'unvisited') tileColor = styles.lightUnvisited;
    else if (tileStatus === 'invalid') tileColor = styles.lightInvalid;
    else if (tileStatus === 'duplicate') tileColor = styles.lightDuplicate;
    else if (tileStatus === 'valid') tileColor = styles.lightValid;
  }

  const pointerDownHandler = (event: PointerEvent<HTMLDivElement>) => {
    // whatever logic you need
    if (tileStatus) event.preventDefault();
    onTileDown(tileId, tileValue);
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const pointerEnterHandler = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    onTileEnter(tileId, tileValue);
  };

  return (
    <div
      className={tileStatus !== 'unvisited' ? styles.animation : ''}
      id = {`${tileId}`}
      onPointerDown = {pointerDownHandler}
    >
      <Paper
        className = {`${styles.tileContainer} ${tileColor}`}
        elevation = {12}
      >
        <Box
          className = {styles.tileWrapper}
          onPointerEnter= {pointerEnterHandler}
        >
          <div>
            {tileValue}
          </div>
        </Box>
      </Paper>
    </div>
  );
}
export default Tile;

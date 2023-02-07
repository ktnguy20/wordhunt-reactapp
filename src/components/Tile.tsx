import React, {MouseEvent} from 'react';
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

  const mouseEnterHandler = (event: MouseEvent<HTMLDivElement>) => {
    onTileEnter(tileId, tileValue);
  };

  const mouseDownHandler = (event: MouseEvent<HTMLDivElement>) => {
    onTileDown(tileId, tileValue);
  };

  return (
    <div
      className={tileStatus !== 'unvisited' ? styles.animation : ''}
      onMouseDown = {mouseDownHandler}
      id = {`${tileId}`}
    >
      <Paper
        className = {`${styles.tileContainer} ${tileColor}`}
        elevation = {12}
      >
        <Box
          className = {styles.tileWrapper}
          onMouseEnter = {mouseEnterHandler}
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

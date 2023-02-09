/* eslint-disable max-len */
import React, {memo, PointerEvent, useEffect, useState} from 'react';
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

const Tile = memo(
    function Tile({
      tileId,
      tileValue,
      onTileDown,
      onTileEnter,
      tileStatus,
      darkMode,
    }: TileProps) {
      const [tileColor, settileColor] = useState<String | undefined>(undefined);

      useEffect(() => {
        if (darkMode) {
          if (!tileStatus) {
            settileColor(styles.darkLogo);
          } else if (tileStatus === 'unvisited') settileColor(styles.darkUnvisited);
          else if (tileStatus === 'invalid') settileColor(styles.darkInvalid);
          else if (tileStatus === 'duplicate') settileColor(styles.darkDuplicate);
          else if (tileStatus === 'valid') settileColor(styles.darkValid);
        } else {
          if (!tileStatus) settileColor(styles.lightLogo);
          else if (tileStatus === 'unvisited') settileColor(styles.lightUnvisited);
          else if (tileStatus === 'invalid') settileColor(styles.lightInvalid);
          else if (tileStatus === 'duplicate') settileColor(styles.lightDuplicate);
          else if (tileStatus === 'valid') settileColor(styles.lightValid);
        }
      }, [tileStatus, darkMode]);

      const pointerDownHandler = (event: PointerEvent<HTMLDivElement>) => {
        if (tileStatus) {
          event.preventDefault();
          onTileDown(tileId, tileValue);
          event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      };

      const pointerEnterHandler = (event: PointerEvent<HTMLDivElement>) => {
        if (tileStatus) {
          event.preventDefault();
          onTileEnter(tileId, tileValue);
        }
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
              <div style={{zIndex: 2}}>
                {tileValue}
              </div>
            </Box>
          </Paper>
        </div>
      );
    },
);

export default Tile;

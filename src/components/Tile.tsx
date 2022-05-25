import React, {useState, useEffect, MouseEvent, SetStateAction} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import './unselectable.css';
import tileImages from '../data/LetterImages';

type TileProps = {
    value:number;
    tileLoc: number[];
    callFromTile: (letter: string, isStart: boolean, tileLoc:number[]) => boolean;
    isMouseDown: () => boolean;
}

const tileStyle = {
    width : "100%",
    // height: "100%",
    display:'block'
};

function Tile(props: TileProps) {
    const letter = String.fromCharCode(65+props.value)
    useEffect(
        () => {
            if (!props.isMouseDown()) {
                setVisited(false);
            }
        }
    )
    const [hasVisited, setVisited] = useState<boolean>(false);
    const mouseEnterHandler = (event: MouseEvent<HTMLDivElement>) => {
        if (hasVisited) {
            return;
        }
        if (props.callFromTile(letter, false, props.tileLoc)) {
            setVisited(true);
        }
    }

    const mouseDownHandler = (event: MouseEvent<HTMLDivElement>) => {
        if (props.callFromTile(letter, true, props.tileLoc)) {
            setVisited(true);
        }
        return;
    }

    return(
        <Grid item xs={3} className="unselectable">
                <div onMouseEnter = {mouseEnterHandler} onMouseDown = {mouseDownHandler}>
                    <img src={tileImages[props.value]} draggable="false" alt="Logo" style={tileStyle} className="unselectable"/>
                </div>
        </Grid>
    );
}
export default Tile;
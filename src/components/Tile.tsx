import React, {useState, useEffect, MouseEvent, SetStateAction} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import './unselectable.css';
import tileImages from '../data/LetterImages';

type TileProps = {
    value:number;
    prevWord: string;
    setWord: (a: string) => void;
}

const tileStyle = {
    width : "100%",
    // height: "100%",
    display:'block'
};

function Tile(props: TileProps) {
    const [hasVisited, setVisited] = useState<boolean>(false);
    const mouseEnterHandler = (event: MouseEvent<HTMLDivElement>) => {
        if (hasVisited) {
            return;
        }
        else {
            // props.setWord((prevWord: string) => {
            //     prevWord+(String.fromCharCode(65+props.value));
            // });
            props.setWord(props.prevWord +(String.fromCharCode(65+props.value)));
            setVisited(true);
            return;
        }
    }

    return(
        <Grid item xs={3} className="unselectable">
                <div onMouseEnter = {mouseEnterHandler}>
                    <img src={tileImages[props.value]} draggable="false" alt="Logo" style={tileStyle} className="unselectable"/>
                </div>
        </Grid>
    );
}
export default Tile;
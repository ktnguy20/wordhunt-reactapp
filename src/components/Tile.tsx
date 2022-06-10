import React, {useState, useEffect, MouseEvent, SetStateAction} from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import './unselectable.css';
import tileImages from '../data/LetterImages';
import TileStatus from '../data/TileStatus';
import { color } from '@mui/system';

type TileProps = {
    value:number;
    tileLoc: number[];
    callFromTile: (letter: string, isStart: boolean, tileLoc:number[]) => boolean;
    isMouseDown: () => boolean;
    tileStatus?: string;
}

function Tile(props: TileProps) {
    const letter = String.fromCharCode(65+props.value)

    const tileStyle = {
        width : "100%",
        // height: "100%",
        display:'block'
    };
    
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: (props.tileStatus !== undefined) ? props.tileStatus : "aliceblue",
      }));

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
                <div onMouseDown = {mouseDownHandler}>
                    {/* <img src={tileImages[props.value]} draggable="false" alt="Logo" style={tileStyle} className="unselectable"/> */}
                    <Item style = {{position: "relative", height: "0", width: "100%", paddingBottom: "100%"}}>
                            <div style = {{position: "absolute", display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", top: "0", bottom: "0", borderRadius: "50%"}} onMouseEnter = {mouseEnterHandler}>
                            {letter}
                            </div>
                    </Item>
                </div>
        </Grid>
    );
}
export default Tile;
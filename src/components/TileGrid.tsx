import React, {useState, useEffect, MouseEvent} from 'react';
// import { styled } from '@mui/material/styles';
import Tile from './Tile'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import './unselectable.css';
import tileImages from '../data/LetterImages';


// const Item = styled(Paper)(({ theme }) => ({
//     // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     color: theme.palette.text.secondary,
//   }));

type TileGridProps = {
    gridArr: number[];
}

function TileGrid(props:TileGridProps) {
    const [currWord, setWord] = useState<string>("");
    const [mouseDown, setMouseDown] = useState<boolean>(false);

    const mouseDownHandler = (event:MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setMouseDown(true);
    }

    const mouseUpHandler = (event:MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setWord("evaluate word here");
        setMouseDown(false);
    }
    return (
        <Box width={{xs:0.6, sm:.5, md: .4, lg:.3, xl:.17}} className="unselectable">
            <div onMouseDown={mouseDownHandler} onMouseUp = {mouseUpHandler}>
                <Paper>
                    {currWord}
                </Paper>
                <Grid container spacing={{xs:1, sm:1.25, md:1.5, lg:1.75, xl:2}} className="unselectable">
                    {props.gridArr.map((x: number) =>
                        <Tile value = {x} setWord = {setWord} prevWord = {currWord} mouseDown = {mouseDown} setMouseDown = {setMouseDown}/>
                    )}  
                </Grid>
            </div>
        </Box>
  );
}

export default TileGrid
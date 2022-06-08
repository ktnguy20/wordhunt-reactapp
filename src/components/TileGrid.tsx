import React, {useState, useEffect, useRef, useCallback, MouseEvent} from 'react';
// import { styled } from '@mui/material/styles';
import Tile from './Tile'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText';
import './unselectable.css';
import validWords from '../data/ValidWords';
import Typography from '@mui/material/Typography'


// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     color: theme.palette.text.secondary,
//   }));

type TileGridProps = {
    gridArr: number[];
}

function TileGrid(props:TileGridProps) {
    const [currWord, setWord] = useState<string>("begin");
    const [mouseDown, setMouseDown] = useState<boolean>(false);
    const [path, setPath] = useState<number[]>([]);
    const [currLoc, setCurrLoc] = useState<number[]>([]);
    const [wordHistory, setWordHistory] = useState<string[]>([]);
    const [tileStatus, setTileStatus] = useState<string>("");
    const scrollRef = useRef<null | HTMLLIElement>(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView();
        }
    });

    const isMouseDown = useCallback(
        () => {
            return mouseDown;
        }, [mouseDown]
    )
    const isAdjacent = (currLoc: number[], tileLoc: number[]) => {
        return ((Math.abs(currLoc[0] - tileLoc[0]) <= 1) && (Math.abs(currLoc[1] - tileLoc[1]) <= 1));
    }
    const callFromTile = (letter: string, isStart: boolean, tileLoc: number[]) => {
        if (isStart) {
            setWord(letter);
            setMouseDown(true);
            setCurrLoc(tileLoc);
            setPath([tileLoc[0]*4 + tileLoc[1]])
            setTileStatus("white");
            return true;
        }
        else if (mouseDown) {
            if (isAdjacent(currLoc, tileLoc)) {
                const newWord = currWord+letter;
                setCurrLoc(tileLoc);
                setPath([...path, tileLoc[0]*4 + tileLoc[1]]);
                if (newWord.length < 3) {
                    setTileStatus("white");
                }
                else if (wordHistory.includes(newWord)) {
                    setTileStatus("yellow")
                }
                else if (validWords[newWord.length-3].includes(newWord)) {
                    setTileStatus("green");
                }
                else {
                    setTileStatus("white");
                }
                setWord(newWord);
            }
        }
        else {
            return false;
        }
        console.log(currWord);
        return true;
    }

    // const isMouseDown = () => {
    //     return mouseDown;
    // }

    const mouseUpHandler = (event:MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setMouseDown(false);
        // console.log(wordHistory)
        // console.log(currWord)
        if (currWord.length < 3) {
            setWord("invalid length");
        }
        else if (wordHistory.includes(currWord)) {
            setWord("word already chosen")
        }
        else if (validWords[currWord.length-3].includes(currWord)) {
            setWord("valid word");
            setWordHistory([...wordHistory, currWord])
        }
        else {
            setWord("invalid word");
        }
        setPath([]);
    }
    return (
        <Box width={{xs:0.6, sm:.5, md: .4, lg:.3, xl:.2}} className="unselectable">
            <div onMouseUp = {mouseUpHandler}>
                <Paper style = {{marginBottom: '2vh'}}>
                    {currWord}
                </Paper>
                <Grid container spacing={{xs:1, sm:1.25, md:1.5, lg:1.75, xl:2}} className="unselectable">
                    {props.gridArr.map((x: number, idx:number) => {
                        
                        return(
                            path.includes(idx) ? <Tile value = {x} tileLoc = {[Math.floor(idx/4), idx%4]} isMouseDown = {isMouseDown} callFromTile = {callFromTile} tileStatus = {tileStatus}/> 
                            : <Tile value = {x} tileLoc = {[Math.floor(idx/4), idx%4]} isMouseDown = {isMouseDown} callFromTile = {callFromTile}/>
                        );
                    })}  
                </Grid>
                <Paper style={{height: 100, overflow: 'auto', marginTop: '2vh'}}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    Word Bank
                </Typography>
                    <List>
                        {wordHistory.map((word: string) => {
                            return(
                                <ListItem ref={scrollRef}>
                                    <ListItemText>
                                        {word + "\n"}
                                    </ListItemText>
                                </ListItem>
                            );
                        })}
                    </List>
                </Paper>
            </div>
        </Box>
  );
}

export default TileGrid;
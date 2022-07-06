import React, {
  useState,
  useEffect,
  useRef,
  MouseEvent,
} from 'react';

// import { styled } from '@mui/material/styles';
import Xarrow, {Xwrapper} from 'react-xarrows';
import Tile from './Tile';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './unselectable.css';
import validWords from '../data/ValidWords';
import Typography from '@mui/material/Typography';


// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     color: theme.palette.text.secondary,
//   }));

type TileGridProps = {
    gridArr: number[];
}


function TileGrid({gridArr}:TileGridProps) {
  const [currWord, setWord] = useState<string>('');
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [path, setPath] = useState<number[]>([]);
  const [wordHistory, setWordHistory] = useState<string[]>([]);
  const [tileStatus, setTileStatus] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const scrollRef = useRef<null | HTMLLIElement>(null);


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  });


  const getCoords = (tileId: number): number[] => {
    return [Math.floor(tileId/4), tileId%4];
  };

  const isAdjacent = (prevTileId: number, currTileId: number): boolean => {
    const prevCoords = getCoords(prevTileId);
    const currCoords = getCoords(currTileId);
    const isHorizAdj: boolean= Math.abs(prevCoords[0] - currCoords[0]) <= 1;
    const isVertAdj: boolean = Math.abs(prevCoords[1] - currCoords[1]) <= 1;
    return (isHorizAdj && isVertAdj);
  };

  const onTileDown = () => {
    setMouseDown((isMouseDown) => !isMouseDown);
  };

  const onTileEnter = (tileId: number, tileLetter: string) => {
    if (mouseDown && ((path.length === 0) ||
    ((!path.includes(tileId)) && isAdjacent(path[path.length-1], tileId)))) {
      setWord((word) => {
        const newWord = word + tileLetter;
        if (newWord.length < 3) {
          setTileStatus('aliceblue');
        } else if (wordHistory.includes(newWord)) {
          setTileStatus('yellow');
        } else if (validWords[newWord.length-3].includes(newWord)) {
          setTileStatus('green');
        } else {
          setTileStatus('aliceblue');
        }
        return (word + tileLetter);
      });
      setPath((path) => path.concat([tileId]));
    }
  };

  const mouseUpHandler = (event:MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setMouseDown(false);
    if (tileStatus === 'green') {
      setWordHistory((wordHistory) => wordHistory.concat([currWord]));
      const scores = [100, 400, 800, 1400, 1800, 2200, 2600, 3000, 3600];
      const wordValue = scores[currWord.length-3];
      setScore((score) => score+wordValue);
    }
    setWord('');
    setPath([]);
    setTileStatus('aliceblue');
  };
  return (
    <Box
      width={{xs: 0.6, sm: .5, md: .4, lg: .3, xl: .2}}
      className="unselectable"
    >
      <div onMouseUp = {mouseUpHandler}>
        <Paper style = {{marginBottom: '2vh', height: '1.3em'}}>
          {`Score: ${score}`}
        </Paper>
        <Paper style = {{
          marginBottom: '2vh',
          height: '1.3em',
          backgroundColor: `${tileStatus}`}}
        >
          {currWord}
        </Paper>
        <Grid container
          spacing={{xs: 1, sm: 1.25, md: 1.5, lg: 1.75, xl: 2}}
          className="unselectable"
        >
          <Xwrapper>
            {gridArr.map((x: number, idx:number) => (
              <Tile
                key = {idx}
                tileId = {idx}
                tileValue = {x}
                onTileDown = {onTileDown}
                onTileEnter = {onTileEnter}
                tileStatus = {path.includes(idx) ? tileStatus : 'aliceblue'}
              />
            ))}
            {path.map((value: number, idx: number) => {
              if (idx == path.length-1) return;
              return (<Xarrow start={`${value}`} end = {`${path[idx+1]}`} showHead={false} path={'straight'} startAnchor={"middle"} endAnchor = {"middle"}/>);
            })}
          </Xwrapper>
        </Grid>
        <Paper style={{height: 100, overflow: 'auto', marginTop: '2vh'}}>
          <Typography sx={{mt: 4, mb: 2}} variant="h6" component="div">
                    Word Bank
          </Typography>
          <List>
            {wordHistory.map((word: string, idx: number) => {
              return (
                <ListItem key = {idx} ref={scrollRef}>
                  <ListItemText>
                    {word + '\n'}
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

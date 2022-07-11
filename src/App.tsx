import React, {useState, useEffect, useRef, MouseEvent} from 'react';
import useCountdown from './hooks/useCountdown';
import './App.css';
import diceArray from './assets/LetterDice/DiceArray';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import validWords from './data/ValidWords';
import Typography from '@mui/material/Typography';
import TileGrid from './components/TileGrid';
import Timer from './components/Timer';

function App() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [gridArr, setGridArr] = useState<string[]>([]);

  // previously in tileGrid component hooks
  const [currWord, setWord] = useState<string>('');
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [path, setPath] = useState<number[]>([]);
  const [wordHistory, setWordHistory] = useState<string[]>([]);
  const [tileStatus, setTileStatus] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [gameLength, setGameLength] = useState<number>(60);
  const scrollRef = useRef<null | HTMLLIElement>(null);
  const onTimeout = (): void => {
    setIsActive((isActive) => false);
  };
  const [clockTime, setTime, isPlaying, setIsPlaying] = useCountdown(
      gameLength, false, onTimeout,
  );
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  });

  // end of tileGrid hooks
  // Fisher-Yates randomization
  const shuffleDice = (dice: string[][]): string[][] => {
    let currentIndex = dice.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [dice[currentIndex], dice[randomIndex]] = [
        dice[randomIndex], dice[currentIndex]];
    }

    return dice;
  };

  const rollDie = (die: string[]): string => {
    return die[Math.floor(Math.random()*die.length)];
  };

  const generateGrid = (): string[] => {
    return (
      shuffleDice(diceArray).map(
          (die: string[]): string => {
            return rollDie(die);
          },
      )
    );
  };

  const handleGameStart = (): void => {
    setWordHistory([]);
    setPath([]);
    setScore(0);
    setWord('');
    setGridArr(generateGrid());
    setIsActive((isActive) => true);
    setTime(gameLength+1);
    setIsPlaying(true);
  };

  const handleGameRestart = (): void => {
    setIsPlaying(false);
    setTimeout(handleGameStart);
  };

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

  const onTileDown = (): void => {
    setMouseDown((isMouseDown) => !isMouseDown);
  };

  const onTileEnter = (tileId: number, tileLetter: string): void => {
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
    <div className="App-header" onMouseUp = {mouseUpHandler}>
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
      {
      isActive ?
        <>
          <Timer clockTime={clockTime}/>
          <TileGrid
            gridArr = {gridArr}
            onTileDown = {onTileDown}
            onTileEnter = {onTileEnter}
            path = {path}
            tileStatus = {tileStatus}
          />
        </>:
        <button
          onClick={handleGameStart}
          style = {{height: '4vh', backgroundColor: 'green'}}
        >
          start game
        </button>
      }
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
      {
      isActive ?
        <div style = {{marginTop: '2vh'}}>
          <button onClick={handleGameRestart}> Restart game </button>
          <button onClick={onTimeout}> Back to landing page </button>
        </div>:
        null
      }

    </div>
  );
}


export default App;

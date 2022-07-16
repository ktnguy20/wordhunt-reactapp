import React, {useState, MouseEvent, useEffect} from 'react';
import useCountdown from './hooks/useCountdown';
import styles from './styles/App.module.scss';
import diceArray from './assets/LetterDice/DiceArray';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import validWords from './data/ValidWords';
import TileGrid from './components/TileGrid';
import Timer from './components/Timer';
import WordHistory from './components/WordHistory';
import InfoModal from './components/modals/InfoModal';
import SettingsModal from './components/modals/SettingsModal';
import ResultsModal from './components/modals/ResultsModal';
import NavBar from './components/NavBar';


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
  const [gameLength, setGameLength] = useState<number>(10);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(true);
  // eslint-disable-next-line max-len
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState<boolean>(false);


  const onTimeout = (): void => {
    setIsActive((isActive) => false);
    setIsResultsModalOpen(true);
  };
  const [clockTime, setTime, isPlaying, setIsPlaying] = useCountdown(
      gameLength, false, onTimeout,
  );

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
    setTimeout(() => setIsPlaying(true), 2);
  };

  const handleGameRestart = (): void => {
    setIsPlaying(false);
    handleGameStart();
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
    <div className={styles.header} onMouseUp = {mouseUpHandler}>
      <NavBar
        handleOpenInfoModal={() => setIsInfoModalOpen(true)}
        handleOpenSettingsModal = {() => setIsSettingsModalOpen(true)}
      />
      {
      isActive ?
        <>
          <Paper style = {{marginBottom: '2vh', height: '1.3em'}}>
            {`Score: ${score}`}
          </Paper>
          <Timer clockTime={clockTime}/>
          <Box
            display = 'inline-block'
            style = {{height: '1.3em', marginBottom: '2vh'}}
          >
            <Paper style = {{
              display: 'inline-block',
              paddingLeft: '5px',
              paddingRight: '5px',
              backgroundColor: `${tileStatus}`}}
            >
              {currWord}
            </Paper>
          </Box>
          <TileGrid
            gridArr = {gridArr}
            onTileDown = {onTileDown}
            onTileEnter = {onTileEnter}
            path = {path}
            tileStatus = {tileStatus}
          />
          <WordHistory wordHistory = {wordHistory}/>
        </>:
        null
      }
      <InfoModal
        isOpen = {isInfoModalOpen}
        handleClose = {() => setIsInfoModalOpen(false)}
        handleStart = {() => handleGameStart()}
        isActive = {isActive}
      />
      <SettingsModal
        isOpen = {isSettingsModalOpen}
        handleClose = {() => setIsSettingsModalOpen(false)}
      />
      <ResultsModal
        isOpen = {isResultsModalOpen}
        handleClose = {() => setIsResultsModalOpen(false)}
        handleRestart = {() => handleGameRestart()}
        score = {score}
        wordHistory = {wordHistory}
        setIsInfoModalOpen = {setIsInfoModalOpen}
      />
    </div>
  );
}


export default App;

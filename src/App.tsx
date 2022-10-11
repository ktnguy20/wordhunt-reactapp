import React, {useState, MouseEvent, useEffect} from 'react';
import useCountdown from './hooks/useCountdown';
import styles from './styles/App.module.scss';
import diceArray from './assets/LetterDice/DiceArray';
import scores from './data/scores';
import {Box, Paper} from '@mui/material';
import validWords from './data/ValidWords';
import NavBar from './components/NavBar';
import Timer from './components/Timer';
import Score from './components/Score';
import CurrentWord from './components/CurrentWord';
import TileGrid from './components/TileGrid';
import WordHistory from './components/WordHistory';
import InfoModal from './components/modals/InfoModal';
import SettingsModal from './components/modals/SettingsModal';
import ResultsModal from './components/modals/ResultsModal';


function App() {
  const [isStart, setIsStart] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [gridArr, setGridArr] = useState<string[][]>([]);
  const [size, setSize] = useState<number>(4);
  // previously in tileGrid component hooks
  const [currWord, setWord] = useState<string>('');
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [path, setPath] = useState<number[]>([]);
  const [wordHistory, setWordHistory] = useState<string[]>([]);
  const [tileStatus, setTileStatus] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  // eslint-disable-next-line max-len
  const [currWordScore, setCurrWordScore] = useState<number>(0);
  const [currWordAnim, setCurrWordAnim] = useState<string>('');
  const [gameLength, setGameLength] = useState<number>(60);
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

  const generateGrid = (): string[][] => {
    const grid: string[][] = [];
    const letters = shuffleDice(diceArray)
        .map(
            (die: string[]): string => {
              return rollDie(die);
            },
        );
    for (let i = 0; i < letters.length; i+=size) {
      grid.push(letters.slice(i, i+size));
    }
    return grid;
  };

  const handleGameStart = (): void => {
    if (isStart) {
      setIsStart(false);
    }
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

  const getCoords = (tileId: number): {x: number, y: number} => {
    return ({x: Math.floor(tileId/size), y: tileId%size});
  };

  const isAdjacent = (prevTileId: number, currTileId: number): boolean => {
    const prevCoords: {x: number, y: number} = getCoords(prevTileId);
    const currCoords: {x: number, y: number} = getCoords(currTileId);
    const isHorizAdj: boolean= Math.abs(prevCoords.x - currCoords.x) <= 1;
    const isVertAdj: boolean = Math.abs(prevCoords.y - currCoords.y) <= 1;
    return (isHorizAdj && isVertAdj);
  };

  const onTileDown = (): void => {
    setWord('');
    setCurrWordAnim('');
    setCurrWordScore(0);
    setMouseDown((isMouseDown) => !isMouseDown);
  };

  const onTileEnter = (tileId: number, tileLetter: string): void => {
    if (mouseDown &&
      (
        (path.length === 0) ||
        ((!path.includes(tileId)) && (isAdjacent(path[path.length-1], tileId)))
      )
    ) {
      setWord((word) => {
        const newWord = word + tileLetter;
        if (newWord.length < 3) {
          setTileStatus('aliceblue');
        } else if (wordHistory.includes(newWord)) {
          setTileStatus('yellow');
        } else if (validWords[newWord.length-3].includes(newWord)) {
          setTileStatus('green');
          setCurrWordScore(scores[newWord.length-3]);
        } else {
          setTileStatus('aliceblue');
        }
        return (word + tileLetter);
      });
      setPath((path) => path.concat([tileId]));
    }
  };

  const mouseUpHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (mouseDown) {
      setMouseDown(false);
      if (tileStatus === 'green') {
        setWordHistory((wordHistory) => wordHistory.concat([currWord]));
        const wordValue = scores[currWord.length-3];
        setScore((score) => score+wordValue);
        setCurrWordAnim('animationValid');
      } else {
        setCurrWordAnim('animationInvalid');
      }
      setPath([]);
      setTileStatus('aliceblue');
    }
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
          <Score score={score}/>
          <Timer clockTime={clockTime}/>
          <CurrentWord
            currentWord = {currWord}
            tileStatus = {tileStatus}
            score = {currWordScore}
            animation = {currWordAnim}
          />
          <div className = {styles.gameLayout}>
            <TileGrid
              gridArr = {gridArr}
              size = {size}
              onTileDown = {onTileDown}
              onTileEnter = {onTileEnter}
              path = {path}
              tileStatus = {tileStatus}
            />
          </div>
        </>:
        null
      }
      <InfoModal
        isOpen = {isInfoModalOpen}
        handleClose = {() => setIsInfoModalOpen(false)}
        handleStart = {() => handleGameStart()}
        isActive = {isActive}
        isStart = {isStart}
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

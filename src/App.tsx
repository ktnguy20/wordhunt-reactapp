import React, {useState, useEffect, MouseEvent} from 'react';
import useCountdown from './hooks/useCountdown';
import styles from './styles/App.module.scss';
import getDice from './assets/LetterDice/DiceArray';
import getScores from './data/Scores';
import TileStatus from './data/TileStatus';
import getValidWords from './data/ValidWords';
import NavBar from './components/NavBar';
import Timer from './components/Timer';
import Score from './components/Score';
import CurrentWord from './components/CurrentWord';
import TileGrid from './components/TileGrid';
// import WordHistory from './components/WordHistory';
import InfoModal from './components/modals/InfoModal';
import SettingsModal from './components/modals/SettingsModal';
import ResultsModal from './components/modals/ResultsModal';
import Tile from './components/Tile';


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
  const [tileStatus, setTileStatus] = useState<TileStatus>(TileStatus.invalid);
  const [scores, setScores] = useState<number[]>(getScores(size));
  const [score, setScore] = useState<number>(0);
  // eslint-disable-next-line max-len
  const [validWords, setValidWords] = useState<{[key: string]: {value: number, path: {row: number, col: number}[]}}>({});
  // eslint-disable-next-line max-len
  const [currWordScore, setCurrWordScore] = useState<number>(0);
  const [currWordAnim, setCurrWordAnim] = useState<string>('');
  const [timeLimit, setTimeLimit] = useState<number>(90);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(true);
  // eslint-disable-next-line max-len
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState<boolean>(false);

  const onTimeout = (): void => {
    setIsActive((isActive) => false);
    setIsResultsModalOpen(true);
  };
  const [clockTime, setTime, isPlaying, setIsPlaying] = useCountdown(
      timeLimit, false, onTimeout,
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

  const generateGrid = (size: number): string[][] => {
    const test: boolean = false;
    const testGrid = [
      ['B', 'H', 'E', 'Q'],
      ['C', 'L', 'G', 'Y'],
      ['S', 'Y', 'W', 'K'],
      ['D', 'A', 'S', 'C'],
    ];
    const grid: string[][] = [];
    const letters = shuffleDice(getDice(size))
        .map(
            (die: string[]): string => {
              return rollDie(die);
            },
        );
    for (let i = 0; i < letters.length; i+=size) {
      grid.push(letters.slice(i, i+size));
    }
    return (!test) ? grid: testGrid;
  };

  const handleGameStart = (size: number, timeLimit: number): void => {
    if (isStart) {
      setIsStart(false);
    }
    const newGrid = generateGrid(size);
    setWordHistory([]);
    setPath([]);
    setScore(0);
    setWord('');
    setGridArr(newGrid);
    setValidWords(getValidWords(size, newGrid));
    setIsActive((isActive) => true);
    setTime(timeLimit+1);
    setTimeout(() => setIsPlaying(true), 3);
  };

  const handleGameRestart = (size: number, timeLimit: number): void => {
    setIsPlaying(false);
    handleGameStart(size, timeLimit);
  };

  const handleChangeSize =
    (event: MouseEvent<HTMLElement>, newSize: number) => {
      event.preventDefault();
      if (newSize) {
        setSize(newSize);
        handleGameRestart(newSize, timeLimit);
      }
    };

  const handleChangeTime =
    (event: MouseEvent<HTMLElement>, newTimeLimit: number) => {
      event.preventDefault();
      if (newTimeLimit) {
        setTimeLimit(newTimeLimit);
        handleGameRestart(size, newTimeLimit);
      }
    };

  const getCoords = (tileId: number): {x: number, y: number} => {
    return ({x: Math.floor(tileId / size), y: tileId % size});
  };

  const isAdjacent = (prevTileId: number, currTileId: number): boolean => {
    const prevCoords: {x: number, y: number} = getCoords(prevTileId);
    const currCoords: {x: number, y: number} = getCoords(currTileId);
    const isHorizAdj: boolean= Math.abs(prevCoords.x - currCoords.x) <= 1;
    const isVertAdj: boolean = Math.abs(prevCoords.y - currCoords.y) <= 1;
    return (isHorizAdj && isVertAdj);
  };

  const onTileDown = (
      tileId: number,
      tileLetter: string,
  ): void => {
    setMouseDown((isMouseDown) => !isMouseDown);
    setCurrWordAnim('');
    setCurrWordScore(0);
    setTileStatus(TileStatus.invalid);
    setWord(tileLetter);
    setPath([tileId]);
  };

  const onTileEnter = (
      tileId: number,
      tileLetter: string,
  ): void => {
    if (mouseDown &&
      (
        (path.length === 0) ||
        ((!path.includes(tileId)) && (isAdjacent(path[path.length-1], tileId)))
      )
    ) {
      setWord((word) => {
        const newWord = word + tileLetter;
        if (newWord.length < 3) {
          setTileStatus(TileStatus.invalid);
        } else if (wordHistory.includes(newWord)) {
          setTileStatus(TileStatus.duplicate);
          setCurrWordScore(0);
        } else if (newWord in validWords) {
          setTileStatus(TileStatus.valid);
          setCurrWordScore(validWords[newWord].value);
        } else {
          setTileStatus(TileStatus.invalid);
          setCurrWordScore(0);
        }
        console.log(newWord);
        return newWord;
      });
      setPath((path) => path.concat([tileId]));
    }
  };

  const mouseUpHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (mouseDown) {
      setMouseDown(false);
      if (tileStatus === 'valid') {
        setWordHistory((wordHistory) => wordHistory.concat([currWord]));
        setScore((score) => score+currWordScore);
        setCurrWordAnim('animationValid');
      } else {
        setCurrWordAnim('animationInvalid');
      }
      setPath([]);
      setTileStatus(TileStatus.invalid);
    }
  };

  return (
    <div
      className={`${styles.body} ${darkMode ? styles.dark : styles.light}`}
      onMouseUp = {mouseUpHandler}
    >
      <NavBar
        handleOpenInfoModal={() => setIsInfoModalOpen(true)}
        handleOpenSettingsModal = {() => setIsSettingsModalOpen(true)}
        darkMode = {darkMode}
      />
      {
      isActive ?
        <>
          <Score score={score} darkMode = {darkMode} />
          <Timer clockTime={clockTime} darkMode = {darkMode}/>
          <CurrentWord
            currentWord = {currWord}
            tileStatus = {tileStatus}
            score = {currWordScore}
            animation = {currWordAnim}
            darkMode = {darkMode}
          />
          <div className = {styles.gameLayout}>
            <TileGrid
              darkMode = {darkMode}
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
        handleStart = {() => handleGameStart(size, timeLimit)}
        isActive = {isActive}
        isStart = {isStart}
        darkMode = {darkMode}
      />
      <SettingsModal
        isOpen = {isSettingsModalOpen}
        handleClose = {() => setIsSettingsModalOpen(false)}
        darkMode = {darkMode}
        toggleDarkMode = {() => setDarkMode((isDark) => !isDark)}
        size = {size}
        setSize = {handleChangeSize}
        timeLimit = {timeLimit}
        setTimeLimit = {handleChangeTime}
      />
      <ResultsModal
        isOpen = {isResultsModalOpen}
        handleClose = {() => setIsResultsModalOpen(false)}
        handleRestart = {() => handleGameRestart(size, timeLimit)}
        score = {score}
        wordHistory = {wordHistory}
        setIsInfoModalOpen = {setIsInfoModalOpen}
        darkMode = {darkMode}
      />
    </div>
  );
}


export default App;

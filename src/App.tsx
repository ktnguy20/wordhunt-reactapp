import React, {useState, PointerEvent, useCallback} from 'react';
import useCountdown from './hooks/useCountdown';
import styles from './styles/App.module.scss';
import getDice from './assets/LetterDice/DiceArray';
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


function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const [isStart, setIsStart] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(false);

  const [gridArr, setGridArr] = useState<string[][]>([]);
  const [size, setSize] = useState<number>(4);
  const [timeLimit, setTimeLimit] = useState<number>(60);

  const [currWord, setCurrWord] = useState<string>('');
  const [currPath, setCurrPath] = useState<number[]>([]);
  const [isPointerDown, setIsPointerDown] = useState<boolean>(false);

  const [tileStatus, setTileStatus] = useState<TileStatus>(TileStatus.invalid);
  const [prevTileStatus, setPrevTileStatus] = useState<
    TileStatus>(TileStatus.invalid);

  const [prevScore, setPrevScore] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const [wordHistory, setWordHistory] = useState<Set<string>>(new Set());
  const [validWords, setValidWords] = useState<
    {[key: string]: {value: number, path: {row: number, col: number}[]}}>({});

  const [isInfoModalOpen, setIsInfoModalOpen] =
    useState<boolean>(true);
  const [isSettingsModalOpen, setIsSettingsModalOpen] =
    useState<boolean>(false);
  const [isResultsModalOpen, setIsResultsModalOpen] =
    useState<boolean>(false);


  const onTimeout = (): void => {
    setIsActive(false);
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
    return grid;
  };

  const handleGameStart = (size: number, timeLimit: number): void => {
    if (isStart) {
      setIsStart(false);
    }
    const newGrid = generateGrid(size);
    setWordHistory(new Set());
    setCurrPath([]);
    setScore(0);
    setCurrWord('');
    setGridArr(newGrid);
    setValidWords(getValidWords(size, newGrid));
    setIsActive(true);
    setTime(timeLimit+1);
    setTimeout(() => setIsPlaying(true), 0);
  };

  const handleGameRestart = (size: number, timeLimit: number): void => {
    setIsPlaying(false);
    handleGameStart(size, timeLimit);
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

  const onTileDown = useCallback((
      tileId: number,
      tileLetter: string,
  ): void => {
    setIsPointerDown((isPointerDown) => !isPointerDown);
    setTileStatus(TileStatus.invalid);
    setCurrWord(tileLetter);
    setPrevScore(0);
    setCurrPath([tileId]);
  }, []);

  const onTileEnter = useCallback((
      tileId: number,
      tileLetter: string,
  ): void => {
    if (isPointerDown &&
      (
        (currPath.length === 0) ||
        (
          (!currPath.includes(tileId)) &&
          (isAdjacent(currPath[currPath.length-1], tileId))
        )
      )
    ) {
      setCurrWord((word) => {
        const newWord = word + tileLetter;
        if (newWord.length < 3) {
          setTileStatus(TileStatus.invalid);
        } else if (wordHistory.has(newWord)) {
          setTileStatus(TileStatus.duplicate);
        } else if (newWord in validWords) {
          setTileStatus(TileStatus.valid);
        } else {
          setTileStatus(TileStatus.invalid);
        }
        return newWord;
      });
      setCurrPath((currPath) => currPath.concat([tileId]));
    }
  }, [currPath]);

  const pointerUpHandler = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (isPointerDown) {
      setIsPointerDown(false);
      if (tileStatus === 'valid') {
        setWordHistory((wordHistory) => wordHistory.add(currWord));
        setScore((score) => score + validWords[currWord].value);
        validWords[currWord].path = currPath.map((tileId: number) => {
          return {row: Math.floor(tileId/size), col: tileId%size};
        });
      }
      setCurrPath([]);
      setTileStatus(TileStatus.invalid);
      setPrevTileStatus(tileStatus);
      setPrevScore(wordHistory.has(currWord) ?
        0: validWords[currWord]?.value | 0);
    }
  };

  return (
    <div
      className={`${styles.body} ${darkMode ? styles.dark : styles.light}`}
      onPointerUp = {pointerUpHandler}
    >
      <NavBar
        handleOpenInfoModal={
          useCallback(() => {
            setIsInfoModalOpen(true);
            setIsPlaying(false);
          }, [])
        }
        handleOpenSettingsModal = {
          useCallback(() => {
            setIsSettingsModalOpen(true);
            setIsPlaying(false);
          }, [])
        }
        darkMode = {darkMode}
      />
      {
      isActive ?
        <>
          <Score score={score} darkMode = {darkMode} />
          <Timer clockTime={clockTime} darkMode = {darkMode}/>
          <CurrentWord
            currentWord = {currWord}
            prevTileStatus = {prevTileStatus}
            tileStatus = {tileStatus}
            prevScore = {prevScore}
            score = {
              wordHistory.has(currWord) ? 0:
              validWords[currWord]?.value | 0
            }
            isPointerDown = {isPointerDown}
            darkMode = {darkMode}
          />
          <div className = {styles.gameLayout}>
            <TileGrid
              darkMode = {darkMode}
              gridArr = {gridArr}
              size = {size}
              onTileDown = {onTileDown}
              onTileEnter = {onTileEnter}
              path = {currPath}
              showDirection = {false}
              tileStatus = {tileStatus}
            />
          </div>
        </>:
        null
      }
      <InfoModal
        isOpen = {isInfoModalOpen}
        handleClose = {() => {
          setIsInfoModalOpen(false);
          setIsPlaying(true);
        }}
        handleStart = {() => handleGameStart(size, timeLimit)}
        isActive = {isActive}
        isStart = {isStart}
        darkMode = {darkMode}
      />
      <SettingsModal
        isOpen = {isSettingsModalOpen}
        handleClose = {useCallback(() => {
          setIsSettingsModalOpen(false);
          if (!isPlaying) {
            setIsPlaying(true);
          }
        }, [isPlaying])}
        handleRestart = {useCallback(handleGameRestart, [])}
        darkMode = {darkMode}
        toggleDarkMode = {
          useCallback(() => setDarkMode((isDark) => !isDark), [])
        }
        size = {size}
        setSize = {useCallback((newSize: number) => setSize(newSize), [])}
        timeLimit = {timeLimit}
        setTimeLimit = {
          useCallback((newTimeLimit: number) => setTimeLimit(newTimeLimit), [])
        }
      />
      <ResultsModal
        isOpen = {isResultsModalOpen}
        handleClose = {() => setIsResultsModalOpen(false)}
        handleRestart = {() => handleGameRestart(size, timeLimit)}
        gridArr = {gridArr}
        size = {size}
        score = {score}
        wordHistory = {wordHistory}
        validWords = {validWords}
        darkMode = {darkMode}
      />
    </div>
  );
}


export default App;

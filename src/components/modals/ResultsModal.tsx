import React, {useState, useMemo, useEffect, useRef} from 'react';
import BaseModal from './BaseModal';
import PathModal from './PathModal';
import styles from '../../styles/ResultsModal.module.scss';

type ResultsModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleRestart: () => void
  gridArr: string[][];
  size: number;
  score: number;
  wordHistory: Set<string>;
  validWords:
    {[key: string]: {value: number, path: {row: number, col: number}[]}};
  darkMode: boolean;
}

function ResultsModal({
  isOpen,
  handleClose,
  handleRestart,
  gridArr,
  size,
  score,
  wordHistory,
  validWords,
  darkMode,
}: ResultsModalProps) {
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [isPathModalOpen, setIsPathModalOpen] = useState<boolean>(false);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  const sumPossibleScore = (validWords: ResultsModalProps['validWords']) => {
    console.log('computing');
    return Object.values(validWords).reduce(
        (acc, x) => acc + x.value,
        0,
    );
  };
  const possibleScore = useMemo(
      () => sumPossibleScore(validWords),
      [validWords],
  );


  const words: string[] = [];
  const scores: number[] = [];

  const allWords: string[] = [];
  const allScores: number[] = [];

  useEffect(() => {
    if (isRevealed) {
      wordsRef.current?.scrollIntoView(
          {behavior: 'auto', block: 'start', inline: 'nearest'},
      );
    } else {
      headerRef.current?.scrollIntoView(
          {behavior: 'auto', block: 'end', inline: 'nearest'},
      );
    }
  }, [isRevealed]);

  Array.from(wordHistory)
      .sort((a: string, b: string) => {
        return b.length - a.length;
      })
      .forEach((word: string, idx: number) => {
        words.push(word);
        scores.push(validWords[word].value);
      });

  Array.from(Object.keys(validWords))
      .sort((a: string, b: string) => {
        return b.length - a.length;
      })
      .forEach((word: string, idx: number) => {
        allWords.push(word);
        allScores.push(validWords[word].value);
      });

  return (
    <BaseModal
      isOpen = {isOpen}
      darkMode = {darkMode}
    >
      {
      !isRevealed ?
        <div style = {{width: '100%', textAlign: 'center'}}>
          <h1 style = {{marginTop: '0'}} ref = {headerRef}> Results </h1>
          <hr style={{width: '80%'}}/>
        </div>:
        ''
      }
      <div
        ref = {wordsRef}
        style={{
          width: '100%',
          display: 'flex',
          marginBottom: '0.5rem',
        }}
      >
        <div
          style={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <h2
            style = {{
              fontSize: '150%',
              textAlign: isRevealed ? 'left': 'center',
              width: '70%',
              marginTop: '0',
            }}
          >
            <a
              style = {{
                fontWeight: 'lighter',
                fontSize: '55%',
              }}>
              {`Words`}
            </a>
            <br/>
            {
              `${isRevealed ?
              Object.keys(validWords).length:
              wordHistory.size}`
            }
          </h2>
          {
            (isRevealed ? allWords: words).map(
                (word: string, idx: number) => {
                  return (
                    <strong
                      key={word}
                      className = {styles.wordEntry}
                      onClick={() => {
                        setSelectedWord(word);
                        setIsPathModalOpen(true);
                      }}
                    > {word} </strong>
                  );
                })
          }
        </div>
        <div
          style={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <h2
            style = {{
              fontSize: '150%',
              textAlign: isRevealed ? 'right': 'center',
              width: '70%',
              marginTop: '0',
            }}
          >
            <a
              style = {{
                fontWeight: 'lighter',
                fontSize: '55%',
              }}>
              {`Score`}
            </a>
            <br/>
            {`${isRevealed ? possibleScore: score}`}
          </h2>
          {
            (isRevealed ? allScores: scores).map(
                (score: number, idx: number) => {
                  return (
                    <strong
                      key={idx}
                      className = {styles.scoreEntry}
                    >
                      {score}
                    </strong>
                  );
                })
          }
        </div>
      </div>

      <div style = {{width: '80%'}}>
      </div>
      <button
        className = {styles.replayButton}
        onClick = {() => {
          setIsRevealed((isRevealed) => {
            return !isRevealed;
          });
        }}
        style = {{backgroundColor: isRevealed ? '': 'indianred'}}
      >
        {!isRevealed ? 'Reveal All': 'Show Your Results'}
      </button>
      <button className = {styles.replayButton} onClick = {() => {
        setIsRevealed(false);
        handleRestart();
        handleClose();
      }}> Play Again </button>
      <PathModal
        isOpen = {isPathModalOpen}
        darkMode = {darkMode}
        handleClose = {() => setIsPathModalOpen(false)}
        gridArr = {gridArr}
        size = {size}
        path = {validWords[selectedWord]?.path}
      />
    </BaseModal>
  );
}

export default ResultsModal;

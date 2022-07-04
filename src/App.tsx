import React, {useState} from 'react';
import './App.css';
import TileGrid from './components/TileGrid';
import Timer from './components/Timer';

function App() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [gridArr, setGridArr] = useState<number[]>([]);

  const generateGrid = (): number[] => {
    return (
      Array.from(
          {length: 16}, () => Math.floor(Math.random() * 26),
      )
    );
  };

  const handleGameStart = () => {
    setGridArr(generateGrid());
    setIsActive((isActive) => !isActive);
  };

  const onTimeout = () => {
    setIsActive((isActive) => !isActive);
  };

  return (
    <div className="App-header">
      {isActive ?
          <>
            <Timer onTimeout = {onTimeout}/>
            <TileGrid gridArr = {gridArr}/>
          </>:
          <button onClick={handleGameStart}> start game </button>
      }
      {/* <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
    </div>
  );
}

export default App;

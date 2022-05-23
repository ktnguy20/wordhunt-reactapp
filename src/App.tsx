import React from 'react';
import logo from './logo.svg';
import './App.css';
import TileGrid from "./components/TileGrid"

function App() {
  const randomLetterArray = Array.from({length: 16}, () => Math.floor(Math.random() * 26));

  return (
    <div className="App">
      <header className="App-header">
       <TileGrid gridArr = {randomLetterArray}/>
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
      </header>
    </div>
  );
}

export default App;

import wordList from '../assets/WordList/ScrabbleWords';
import getScores from './Scores';
import {TrieNode, Trie} from './Trie';


const getValidWords = (
    boardSize: number,
    board: string[][],
): {[key: string]: {value: number, path: {row: number, col: number}[]}} => {
  const possibleWordsTrie = new Trie();
  const validWordsMap:
    {[key: string]: {value: number, path: {row: number, col: number}[]}} = {};
  const visited = [...Array(boardSize)].map(() => Array(boardSize));
  const scores = getScores(boardSize);

  wordList
      .filter((word: string) => {
        return word.length > 2 && word.length < boardSize ** 2;
      })
      .forEach((word: string) => {
        possibleWordsTrie.insert(word);
      });

  const inBounds = (x: number, y:number) => {
    return x >= 0 && x < boardSize && y >= 0 && y < boardSize;
  };

  const solveBoard = (
      root: TrieNode, y: number,
      x: number,
      visited: boolean[][],
      str: string,
      path: {row: number, col: number}[],
  ): void => {
    visited[y][x] = true;
    if (root.isValidWord) {
      const word: string = str;
      validWordsMap[word] = {value: scores[word.length], path: path};
    }

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const newY = y+dy;
        const newX = x+dx;
        if (newY !== y || newX !== x) {
          if (inBounds(newY, newX) && !visited[newY][newX]) {
            if (board[newY][newX] in root.children) {
              const nextNode = root.children[board[newY][newX]];
              solveBoard(nextNode, newY, newX, visited, str+nextNode.key,
                  path.concat([{row: newY, col: newX}],
                  ));
            }
          }
        }
      }
    }
    visited[y][x] = false;
  };

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      solveBoard(possibleWordsTrie.root, i, j, visited, '', []);
    }
  }

  return validWordsMap;
};

export default getValidWords;

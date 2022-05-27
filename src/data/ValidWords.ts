import wordList from '../assets/WordList/ScrabbleWords'

let validWords: string[][] = [...Array(14)].map(a => Array(0));
wordList.filter((word: string) => word.length > 2 && word.length < 17).forEach((word:string) => {
    validWords[word.length - 3].push(word);
});
export default validWords;


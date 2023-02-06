const scores = (boardSize: number) => {
  return [0, 0, 0, 100, 400, 800].concat(
      Array.from({length: (boardSize ** 2) - 5}, (v, i) => {
        return 1400 + i * 400;
      }));
};

export default scores;

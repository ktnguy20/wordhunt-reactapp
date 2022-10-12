const scores = [100, 400, 800].concat(Array.from({length: 20}, (v, i) => {
  return (1400 + (i*400));
}));

export default scores;

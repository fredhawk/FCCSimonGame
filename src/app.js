import css from './style.scss';

function randomizer(colorsArray) {
  return colorsArray[Math.floor(Math.random() * colorsArray.length)];
}

const game = {
  colors: ['red', 'blue', 'green', 'yellow'],
  userSequence: [],
  currentSequence: [],
  isStrict: false,
  roundCount: 0,
  makeTurn() {
    this.current.push(randomizer(this.colors));
  },
};

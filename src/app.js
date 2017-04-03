import css from './style.scss';

const colors = ['red', 'blue', 'green', 'yellow'];
const userSequence = [];
const currentSequence = [];
let isStrict = false;
let roundCount = 0;

function randomizer(colorsArray) {
  return colorsArray[Math.floor(Math.random() * colorsArray.length)];
}

randomizer(colors);

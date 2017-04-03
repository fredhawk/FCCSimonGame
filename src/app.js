import css from './style.scss';

const colors = ['red', 'blue', 'green', 'yellow'];
const userSequence = [];
const computerSequence = [];

function randomizer(colorsArray) {
  return colorsArray[Math.random(Math.floor() * colorsArray.length)];
}

randomizer(colors);

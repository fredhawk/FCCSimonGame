import css from './style.scss';

const gameField = document.querySelector('.game');
const startButton = document.querySelector('.start');

function randomizer(colorsArray) {
  return colorsArray[Math.floor(Math.random() * colorsArray.length)];
}

const game = {
  colors: ['red', 'blue', 'green', 'yellow'],
  userSequence: [],
  currentSequence: [],
  isStrict: false,
  roundCount: 0,
  gameSounds: {
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
  },
  gameLoop() {

  },
  startGame() {
    this.resetGame();
  },
  resetGame() {
    this.roundCount = 0;
    this.userSequence = [];
    this.currentSequence = [];
    this.makeTurn();
  },
  makeTurn() {
    this.roundCount = this.addCount(this.roundCount);
    this.currentSequence.push(randomizer(this.colors));
    this.userSequence = [];
    console.log(this.roundCount);
    console.log(this.currentSequence);
  },
  // toggleStrict(strictState) {
  //   strictState = !strictState;
  //   return strictState;
  // },
  handleClick(color) {
    this.playSound(color);
    // push color to userSequence
    this.userSequence.push(color);
    console.log(this.userSequence);
  },
  playSound(playedColor) {
    // Handle playsound based on which color is played.
    console.log(playedColor);
    this.gameSounds[playedColor].play();
  },
  addCount(counter) {
    return counter + 1;
  },
};

gameField.addEventListener('click', e => game.handleClick(e.target.id));
startButton.addEventListener('click', () => game.startGame());

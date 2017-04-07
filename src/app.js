import css from './style.scss';

const gameField = document.querySelector('.game');
const startButton = document.querySelector('.start');

function randomizer(colorsArray) {
  return colorsArray[Math.floor(Math.random() * colorsArray.length)];
}

function isArrayEquals(arr1, arr2) {
  console.log('arr1', arr1);
  console.log('arr2', arr2);
  return true;
  // if (arr1.length !== arr2.length) {
  //   return false;
  // }
  // for (let i = arr1.length; i - 1;) {
  //   if (arr1[i] !== arr2[i]) {
  //     return false;
  //   }
  // }
  // return true;
}

const game = {
  colors: ['red', 'blue', 'green', 'yellow'],
  userSequence: ['blue', 'red'],
  targetSequence: ['blue', 'red', 'green', 'yellow'],
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
    this.targetSequence = [];
    this.makeTurn();
  },
  makeTurn() {
    this.roundCount = this.addCount(this.roundCount);
    this.targetSequence.push(randomizer(this.colors));
    this.userSequence = [];
    console.log(this.roundCount);
    console.log(this.targetSequence);
  },
  // toggleStrict(strictState) {
  //   strictState = !strictState;
  //   return strictState;
  // },
  handleClick(color) {
    this.playSound(color);
    this.userSequence.push(color);
    // check if move isValid
    const check = this.isMoveValid(this.userSequence, this.targetSequence);
    console.log('check', check);

    if (check) {
      console.log('they are the same');
    } else {
      console.log('they are different');
    }
  },
  playSound(playedColor) {
    this.gameSounds[playedColor].play();
  },
  addCount(counter) {
    return counter + 1;
  },
  isMoveValid(userArr, targetArr) {
    const userLen = userArr.length;
    const currArr = targetArr.slice(0, userLen);
    console.log('currArr', currArr);
    console.log('userArr', userArr);
    console.log('targetArr', targetArr);
    const check = isArrayEquals(userArr, currArr);
    console.log('check 2', check);
    if (1 === true) {
      console.log('false from inside isMoveValid');
      return false;
    }
    return true;
  },
};

gameField.addEventListener('click', e => game.handleClick(e.target.id));
startButton.addEventListener('click', () => game.startGame());

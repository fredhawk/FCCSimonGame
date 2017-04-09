import css from './style.scss';

const gameField = document.querySelector('.game');
const startButton = document.querySelector('.start');

function randomizer(colorsArray) {
  return colorsArray[Math.floor(Math.random() * colorsArray.length)];
}

function isArrayEquals(arr1, arr2) {
  console.log('arr1', arr1);
  console.log('arr1.length', arr1.length);
  console.log('arr2', arr2);
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i += 1) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
    console.log('arr1[i]', arr1[i]);
    console.log('arr2[i]', arr2[i]);
  }
  return true;
}

const game = {
  colors: ['red', 'blue', 'green', 'yellow'],
  userSequence: [],
  targetSequence: [],
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
  playSound(playedColor) {
    this.gameSounds[playedColor].play();
  },
  playSoundSequence(sequenceArray) {
    sequenceArray.forEach((color, index) => {
      setTimeout(() => this.playSound(color), 700 * (index + 1));
    });
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
    if (this.roundCount < 21) {
      this.roundCount = this.addCount(this.roundCount);
      this.targetSequence.push(randomizer(this.colors));
      this.userSequence = [];
      this.playSoundSequence(this.targetSequence);
      console.log(this.roundCount);
      console.log(this.targetSequence);
    } else {
      console.log('You won');
    }
  },
  // toggleStrict(strictState) {
  //   strictState = !strictState;
  //   return strictState;
  // },
  handleClick(color) {
    this.playSound(color);
    this.userSequence.push(color);
    // check if move isValid
    if (this.isMoveValid(this.userSequence, this.targetSequence)) {
      console.log('they are the same');
      if (this.userSequence.length === this.targetSequence.length) {
        this.makeTurn();
      }
    } else {
      console.log('they are different');
    }
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
    if (isArrayEquals(userArr, currArr) === true) {
      return true;
    }
    return false;
  },
};

gameField.addEventListener('click', e => game.handleClick(e.target.id));
startButton.addEventListener('click', () => game.startGame());

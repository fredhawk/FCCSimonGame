import css from './style.scss';

const gameField = document.querySelector('.game-board');
const startButton = document.querySelector('.start');
const round = document.querySelector('.round-count');
const end = document.querySelector('.message');
const strictMode = document.querySelector('.strict-mode');

function randomize(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function isArrayEquals(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i += 1) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

const game = {
  colors: ['red', 'blue', 'green', 'yellow'],
  userSequence: [],
  targetSequence: ['red', 'blue', 'green', 'yellow'],
  isStrict: false,
  roundCount: 0,
  gameSounds: {
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
  },
  messages: {
    win: 'You won!',
    lose: 'You failed. Now you have to start over!',
    retry: 'Wrong sequence. Try again',
    next: 'You are doing great! Keep it up!',
  },
  removeFillFromCircle(colorId) {
    document.getElementById(colorId).style.fill = 'none';
  },
  lightUpTile(tile) {
    const color = document.getElementById(tile);
    const tileToFill = color.childNodes[5];
    switch (tile) {
      case 'yellow':
        tileToFill.style.fill = 'url(#yellow-radial)';
        break;
      case 'red':
        tileToFill.style.fill = 'url(#red-radial)';
        break;
      case 'green':
        tileToFill.style.fill = 'url(#green-radial)';
        break;
      case 'blue':
        tileToFill.style.fill = 'url(#blue-radial)';
        break;
      default:
        tileToFill.style.fill = 'none';
        break;
    }
    setTimeout(() => this.removeFillFromCircle(tileToFill.id), 350);
  },
  playSound(tile) {
    this.gameSounds[tile].play();
  },
  playSoundSequence(sequenceArray) {
    this.removeClick();
    sequenceArray.forEach((color, index, array) => {
      setTimeout(() => this.playSound(color), 700 * (index + 1));
      setTimeout(() => this.lightUpTile(color), 700 * (index + 1));
      setTimeout(() => this.addClick(), 700 * array.length);
    });
  },
  addCount(counter) {
    return counter + 1;
  },
  removeClick() {
    gameField.removeEventListener('click', this.playGame);
  },
  addClick() {
    gameField.addEventListener('click', this.playGame);
  },
  handleStrict(strictState) {
    if (strictState === true) {
      return true;
    }
    return false;
  },
  startGame() {
    this.addClick();
    this.resetGame();
  },
  resetGame() {
    this.roundCount = 0;
    this.userSequence = [];
    this.targetSequence = [];
    end.textContent = '';
    this.isStrict = this.handleStrict(strictMode.checked);
    this.nextTurn();
    this.makeTurn();
  },
  nextTurn() {
    this.roundCount = this.addCount(this.roundCount);
    round.textContent = this.roundCount;
    this.targetSequence.push(randomize(this.colors));
  },
  makeTurn(whichTurn) {
    if (whichTurn === 'repeat') {
      end.textContent = this.messages.retry;
    }
    if (whichTurn === 'next') {
      end.textContent = this.messages.next;
      this.nextTurn();
    }
    this.userSequence = [];
    this.playSoundSequence(this.targetSequence);
  },
  handleClick(tile) {
    this.playSound(tile);
    this.lightUpTile(tile);
    this.userSequence.push(tile);
    if (this.isMoveValid(this.userSequence, this.targetSequence)) {
      if (this.userSequence.length === this.targetSequence.length) {
        if (this.roundCount === 20) {
          end.textContent = this.messages.win;
          this.removeClick();
          return;
        }
        this.makeTurn('next');
      }
    } else {
      if (this.isStrict === true) {
        end.textContent = this.messages.lose;
        this.removeClick();
        return;
      }
      this.makeTurn('repeat');
    }
  },
  playGame(e) {
    const tile = e.target.id;
    game.handleClick(tile);
  },
  isMoveValid(userArr, targetArr) {
    const userLen = userArr.length;
    const currArr = targetArr.slice(0, userLen);
    if (isArrayEquals(userArr, currArr) === true) {
      return true;
    }
    return false;
  },
};

startButton.addEventListener('click', () => game.startGame());

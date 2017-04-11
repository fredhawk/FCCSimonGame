import css from './style.scss';

const gameField = document.querySelector(`.game`);
const startButton = document.querySelector(`.start`);
const round = document.querySelector(`.roundcounter`);
const end = document.querySelector(`.end-message`);

function randomizer(colorsArray) {
  return colorsArray[Math.floor(Math.random() * colorsArray.length)];
}

function isArrayEquals(arr1, arr2) {
  console.log(`arr1`, arr1);
  console.log(`arr1.length`, arr1.length);
  console.log(`arr2`, arr2);
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i += 1) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
    console.log(`arr1[i]`, arr1[i]);
    console.log(`arr2[i]`, arr2[i]);
  }
  return true;
}

const game = {
  colors: [`red`, `blue`, `green`, `yellow`],
  userSequence: [],
  targetSequence: [`red`, `blue`, `green`, `yellow`],
  isStrict: true,
  roundCount: 0,
  gameSounds: {
    red: new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound1.mp3`),
    blue: new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound2.mp3`),
    green: new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound3.mp3`),
    yellow: new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound4.mp3`),
  },
  lightUpTile(tile) {
    const color = document.getElementById(tile);
    color.classList.add(`lightup`);
    setTimeout(() => color.classList.remove(`lightup`), 350);
  },
  playSound(tile) {
    this.gameSounds[tile].play();
  },
  playSoundSequence(sequenceArray) {
    sequenceArray.forEach((color, index) => {
      setTimeout(() => this.playSound(color), 700 * (index + 1));
      setTimeout(() => this.lightUpTile(color), 700 * (index + 1));
    });
  },
  addCount(counter) {
    return counter + 1;
  },
  gameEnd() {
    gameField.removeEventListener(`click`, game.handleClick);
  },
  startGame() {
    this.resetGame();
    gameField.addEventListener(`click`, game.handleClick);
  },
  resetGame() {
    this.roundCount = 0;
    this.userSequence = [];
    this.targetSequence = [];
    end.textContent = ``;
    this.nextTurn();
    this.makeTurn();
  },
  nextTurn() {
    this.roundCount = this.addCount(this.roundCount);
    round.textContent = this.roundCount;
    this.targetSequence.push(randomizer(this.colors));
  },
  makeTurn(whichTurn) {
    if (this.roundCount < 21) {
      if (whichTurn === `repeat`) {
        end.textContent = `Wrong sequence. Try again`;
      }
      if (whichTurn === `next`) {
        end.textContent = `You are doing great! Keep it up!`;
        this.nextTurn();
      }
      this.userSequence = [];
      this.playSoundSequence(this.targetSequence);
      console.log(this.roundCount);
      console.log(this.targetSequence);
    } else {
      end.textContent = `You won!`;
      game.gameEnd();
    }
  },
  // toggleStrict(strictState) {
  //   strictState = !strictState;
  //   return strictState;
  // },
  handleClick(e) {
    const tile = e.target.id;
    game.playSound(tile);
    game.lightUpTile(tile);
    game.userSequence.push(tile);
    // check if move isValid
    if (game.isMoveValid(game.userSequence, game.targetSequence)) {
      console.log(`they are the same`);
      if (game.userSequence.length === game.targetSequence.length) {
        game.makeTurn(`next`);
      }
    } else {
      console.log(`they are different`);
      if (game.isStrict === true) {
        end.textContent = `You failed. Now you have to start over!`;
        game.gameEnd();
        return;
      }
      game.makeTurn(`repeat`);
    }
  },
  isMoveValid(userArr, targetArr) {
    const userLen = userArr.length;
    const currArr = targetArr.slice(0, userLen);
    console.log(`currArr`, currArr);
    console.log(`userArr`, userArr);
    console.log(`targetArr`, targetArr);
    if (isArrayEquals(userArr, currArr) === true) {
      return true;
    }
    return false;
  },
};

gameField.addEventListener(`click`, game.handleClick);
startButton.addEventListener(`click`, () => game.startGame());
window.onload = game.startGame();

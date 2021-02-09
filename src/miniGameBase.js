import Events from './events.js';

const defaultGameName = (nDigits = 4) => {
  const randNum = random(10 ** (nDigits - 1));
  const randNumStr = randNum.toLocaleString('en-US', { minimumIntegerDigits: nDigits });

  return `Game #${randNumStr}`;
};

export default class MiniGame {
  constructor({ name, instructions = 'Win the game' }) {
    this.name = name || defaultGameName();
    this.instructions = instructions;
    this.events = new Events();

    this.maxSeconds = 5;
    this.startTime = Date.now();

    this.gameOver = false;
    this.gameWon = false;
  }

  get secondsElapsed() {
    const millisecondsElapsed = Date.now() - this.startTime;
    return millisecondsElapsed / 1000;
  }

  get percentElapsed() {
    return this.secondsElapsed / this.maxSeconds;
  }

  resetTime() {
    this.startTime = Date.now();
  }

  reset() {
    this.gameOver = false;
    this.gameWon = false;
    this.resetTime();
    this.resetGame();
  }

  // eslint-disable-next-line class-methods-use-this
  resetGame() {
    throw new TypeError('MiniGame subclasses must define an `resetGame()` method.');
  }

  // eslint-disable-next-line class-methods-use-this
  update() {
    throw new TypeError('MiniGame subclasses must define an `update()` method.');
  }

  // eslint-disable-next-line class-methods-use-this
  draw() {
    throw new TypeError('MiniGame subclasses must define a `draw()` method.');
  }
}

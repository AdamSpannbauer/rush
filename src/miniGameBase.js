import { Events } from './events.js';
import { Instructions } from './instructions.js';
import { drawIcon } from './utils.js';

export class MiniGame {
  constructor({ name, instructions = 'Win the game' }) {
    this.name = name;
    this.instructions = new Instructions({ text: instructions });
    this.events = new Events();

    this.maxSeconds = 5;
    this.startTime = Date.now();

    this.gameOver = false;
    this.gameWon = false;

    this.instructions.inputs = {
      usesMouseClick: false,
      usesMouseHover: false,
      usesArrowKeys: false,
      usesSpaceBar: false,
      usesKeyboard: false,
    };
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

  drawIcon(str, x, y, size) {
    drawIcon(str, x, y, this.fontAwesome, size);
  }

  // eslint-disable-next-line class-methods-use-this
  resetGame() {
    throw new TypeError(
      'MiniGame subclasses must define an `resetGame()` method.',
    );
  }

  // eslint-disable-next-line class-methods-use-this
  update() {
    throw new TypeError(
      'MiniGame subclasses must define an `update()` method.',
    );
  }

  // eslint-disable-next-line class-methods-use-this
  draw() {
    throw new TypeError('MiniGame subclasses must define a `draw()` method.');
  }
}

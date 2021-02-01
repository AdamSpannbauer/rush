const defaultGameName = (nDigits = 4) => {
  const randNum = random(10 ** (nDigits - 1));
  const randNumStr = randNum.toLocaleString('en-US', { minimumIntegerDigits: nDigits });

  return `Game #${randNumStr}`;
};

export default class MiniGame {
  constructor({ name = null, props = {} }) {
    this.name = name === null ? defaultGameName() : name;
    this.props = props;

    this.gameOver = false;
  }

  reset() {
    this.gameOver = false;
  }

  start() {
    this.reset();
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

import MiniGame from '../../miniGameBase.js';

export default class YourMiniGame extends MiniGame {
  constructor() {
    super({ name: 'YourMiniGame Name', instructions: 'Do the thing!', props: {} });
  }

  resetGame() {
    // TODO: write a resetGame method (required)
  }

  update() {
    // TODO: write an update method (required)
  }

  draw() {
    // TODO: write a draw method (required)
  }
}

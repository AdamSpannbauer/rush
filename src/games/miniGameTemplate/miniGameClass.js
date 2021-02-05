import MiniGame from '../../miniGameBase.js';

export default class YourMiniGame extends MiniGame {
  constructor() {
    super({ name: 'YourMiniGame Name', instructions: 'Do the thing!', props: {} });
  }

  resetGame() {
    // TODO: write a resetGame method (required)
  }

  update(events) {
    // TODO: write an update method (required)

    // Examples with events:
    //  if (events.mousePressed) {//do stuff}
    //  if (events.mouseReleased) {//do stuff}
  }

  draw() {
    // TODO: write a draw method (required)
  }
}

import { MiniGame } from '../../miniGameBase.js';

export class YourMiniGame extends MiniGame {
  constructor() {
    super({ name: 'YourMiniGame', instructions: 'Do the thing!' });

    this.instructions.inputs = {
      usesMouseClick: false,
      usesMouseHover: false,
      usesArrowKeys: false,
      usesSpaceBar: false,
      usesKeyboard: false,
    };
  }

  resetGame() {
    // TODO: write a resetGame method (required)
  }

  update() {
    // TODO: write an update method (required)
    // Examples with events:
    //  if (this.events.mousePressed) {//do stuff}
    //  if (this.events.mouseReleased) {//do stuff}
    //  if (this.events.keyWasPressed('enter')) {//do stuff}
    //  if (this.events.keyWasReleased('arrowup')) {//do stuff}
  }

  draw() {
    // TODO: write a draw method (required)
  }
}

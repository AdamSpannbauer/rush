import { MiniGame } from "../../miniGameBase.js";
import { PopupWindow } from "./popupWindow.js";

export class PopupCloser extends MiniGame {
  constructor() {
    super({ name: "Popup Closer", instructions: "Close the popups" });

    this.nPopups = 5;
    this.popups = [];
    this.resetGame();
  }

  resetGame() {
    for (let i = 0; i < this.nPopups; i += 1) {
      this.popups.push(new PopupWindow());
    }
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
    push();
    fill(200);
    this.popups.forEach((popup) => {
      popup.draw();
    });
    pop();
    // TODO: write a draw method (required)
  }
}

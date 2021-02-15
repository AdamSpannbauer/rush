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
  }

  update() {
    if (this.events.mousePressed) {
      const popup = this.popups[this.popups.length - 1];
      if (popup.click(mouseX, mouseY)) {
        this.popups.pop();
      } else if (popup.click(mouseX, mouseY) === false) {
        this.gameOver = true;
      } else {
        return;
      }
    }

    if (!this.popups.length) {
      this.gameWon = true;
      this.gameOver = true;
    }
  }

  draw() {
    push();
    fill(200);
    this.popups.forEach((popup, i) => {
      if (i === this.popups.length - 1) {
        fill(100);
      }
      popup.draw();
    });
    pop();
  }
}

import { MiniGame } from "../../miniGameBase.js";
import { dogName } from "./dogName.js";

export class CallYourDog extends MiniGame {
  constructor() {
    super({ name: "CallYourDog", instructions: "Call your dog!" });

    this.instructions.inputs = {
      usesMouseClick: false,
      usesMouseHover: false,
      usesArrowKeys: false,
      usesSpaceBar: false,
      usesKeyboard: true,
    };

    this.dogR = width * 0.05;
    this.dogX = width * 0.1;
    this.dogY = height / 2;
    this.dogName = random(dogName);

    this.gameStart = Date.now();
    this.resetGame();
  }

  resetGame() {}

  get secondsElapsed() {
    const millisecondsElapsed = Date.now() - this.gameStart;
    return millisecondsElapsed / 1000;
  }

  update() {
    this.dogX = this.percentElapsed * width * 0.9;
  }

  draw() {
    push();
    text(this.dogName, this.dogX, this.dogY - height * 0.08);
    this.drawIcon("\uf6d3", this.dogX, this.dogY, this.dogR * 2);

    this.drawIcon("\uf818", width * 0.9, height / 2, this.dogR * 2);
    pop();
  }
}

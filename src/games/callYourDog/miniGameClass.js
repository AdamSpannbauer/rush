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

    this.keysPressed = [];

    this.dogR = width * 0.05;
    this.dogX = width * 0.1;
    this.dogY = height / 2;
    this.dogName = random(dogName);

    this.dogNameX = width / 2;
    this.nameArray = this.dogName.split("");

    this.gameStart = Date.now();
    this.resetGame();
  }

  resetGame() {}

  drawDogName() {
    push();
    textAlign(RIGHT);
    textSize(width * 0.08);

    // All of this just to keep text centered
    const midpoint = ceil(this.nameArray.length / 2);
    const firstHalf = this.nameArray.slice(0, midpoint).join("");
    let letterX = width / 2 - textWidth(firstHalf) * 1.05;

    this.nameArray.forEach((letter, i) => {
      let buffer = textWidth(letter) * 1.05;
      letterX += buffer;

      push();
      if (this.events.keysPressed[i] === this.nameArray[i]) {
        fill(100, 20, 200);
      }

      text(letter, letterX, height * 0.2);
      pop();
    });
    pop();
  }

  get secondsElapsed() {
    const millisecondsElapsed = Date.now() - this.gameStart;
    return millisecondsElapsed / 1000;
  }

  update() {
    this.dogX = this.percentElapsed * width * 0.9;
  }

  draw() {
    // testing seeing which keys pressed I can see
    push();
    textAlign(RIGHT);
    textSize(width * 0.08);
    let letterX = width / 2;
    this.events.keysPressed.forEach((letter) => {
      let buffer = textWidth(letter) * 1.05;
      letterX += buffer;

      text(letter, letterX, height * 0.8);
    });
    pop();

    this.drawDogName();
    this.drawIcon("\uf6d3", this.dogX, this.dogY, this.dogR * 2);
    this.drawIcon("\uf818", width * 0.9, height / 2, this.dogR * 2);
  }
}

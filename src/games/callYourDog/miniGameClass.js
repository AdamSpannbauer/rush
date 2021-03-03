import { MiniGame } from "../../miniGameBase.js";
import { dogName, trash } from "./dogAssets.js";

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
    this.dogX = width * 0.9;
    this.dogY = height / 2;

    this.resetGame();
  }

  resetGame() {
    this.userKeyInput = [];
    this.dogName = random(dogName);
    this.trash = random(trash);
    this.nameArray = this.dogName.split("");
    this.gameStart = Date.now();
  }

  checkKey() {
    if (!this.events.keysPressed.length > 0) {
      return;
    }
    let nextLetter = this.nameArray[this.userKeyInput.length];

    if (this.events.keyWasPressed(nextLetter)) {
      this.userKeyInput.push(nextLetter);
    }
  }

  drawDogName() {
    push();
    textAlign(RIGHT);
    textSize(width * 0.05);

    const nameHalfpoint = textWidth(this.dogName) / 2;
    let letterX = this.dogX - nameHalfpoint;

    this.nameArray.forEach((letter, i) => {
      let buffer = textWidth(letter) * 1.05;
      letterX += buffer;

      push();
      if (this.userKeyInput[i] === this.nameArray[i]) {
        fill(20, 255, 20);
      }

      text(letter, letterX, height * 0.35);
      pop();
    });
    pop();
  }

  update() {
    this.dogX = width - this.percentElapsed * width * 0.9;

    if (this.userKeyInput.join("") === this.dogName) {
      this.gameWon = true;
      this.gameOver = true;
    }
  }

  draw() {
    this.checkKey();
    this.drawDogName();

    push();
    const angle = map(
      sin(this.dogX * 0.05),
      -1,
      1,
      QUARTER_PI / 4,
      -QUARTER_PI / 4
    );
    translate(this.dogX, this.dogY);
    rotate(angle);
    scale(-1, 1);

    this.drawIcon("\uf6d3", 0, 0, this.dogR * 2);
    pop();

    this.drawIcon(this.trash, width * 0.1, height / 2, this.dogR * 2);
  }
}

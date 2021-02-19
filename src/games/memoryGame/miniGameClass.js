import { MiniGame } from '../../miniGameBase.js';
import { drawPolygon } from '../../utils.js';

export class MemoryGame extends MiniGame {
  constructor() {
    super({
      name: 'Memory Game',
      instructions: 'Memorize the shapes',
      props: {},
    });

    this.instructions.inputs = {
      usesMouseClick: true,
      usesMouseHover: false,
      usesArrowKeys: false,
      usesSpaceBar: false,
      usesKeyboard: false,
    };

    this.memoryStart = Date.now();
    this.totalMemorySeconds = 2.5;

    this.playerOptions = [3, 4, 5, 6];
    this.answerKey = this.playerOptions.map(() => random(this.playerOptions));
    this.userAnswers = [];

    let offset;

    this.radius = width * 0.09;
    this.answersY = height * 0.4;
    offset = (this.answerKey.length / 2) * this.radius * 2;
    this.minX = width / 2 - offset;
    this.maxX = width / 2 + offset;

    this.optionsRadius = this.radius * 0.5;
    this.optionsY = height * 0.75;
    offset = (this.answerKey.length / 2) * this.optionsRadius * 2;
    this.minOptionsX = width / 2 - offset;
    this.maxOptionsX = width / 2 + offset;
  }

  get memorySecondsElapsed() {
    const millisecondsElapsed = Date.now() - this.memoryStart;
    return millisecondsElapsed / 1000;
  }

  get memoryStage() {
    return this.memorySecondsElapsed < this.totalMemorySeconds;
  }

  resetGame() {
    this.memoryStart = Date.now();
    this.userAnswers = [];
    this.answerKey = this.playerOptions.map(() => random(this.playerOptions));
  }

  checkAnswer() {
    if (this.events.mousePressed) {
      this.playerOptions.forEach((playerOption, i) => {
        const x = map(
          i,
          0,
          this.answerKey.length - 1,
          this.minOptionsX,
          this.maxOptionsX,
        );

        const d = dist(mouseX, mouseY, x, this.optionsY);

        if (d < this.optionsRadius) {
          this.userAnswers.push(playerOption);
        }
      });
    }
  }

  update() {
    if (this.memoryStage) {
      this.resetTime();
    } else {
      this.checkAnswer();
    }

    if (this.userAnswers.length === this.answerKey.length) {
      let allEqual = true;
      this.userAnswers.forEach((answer, i) => {
        allEqual = allEqual && answer === this.answerKey[i];
      });

      this.gameWon = allEqual;
      this.gameOver = true;
    }
  }

  drawAnswer(x, i) {
    let y = this.answersY;
    let nSides = 0;

    if (this.memoryStage) {
      nSides = this.answerKey[i];
    } else if (i < this.userAnswers.length) {
      nSides = this.userAnswers[i];
    }

    // Triangle looks better adjusted down
    if (nSides === 3) y += this.radius * 0.1;

    if (nSides) {
      drawPolygon(x, y, this.radius, -HALF_PI, nSides);
    }
  }

  drawOption(i) {
    if (this.memoryStage) return;

    const x = map(
      i,
      0,
      this.answerKey.length - 1,
      this.minOptionsX,
      this.maxOptionsX,
    );

    let y = this.optionsY;
    // Triangle looks better adjusted down
    if (this.playerOptions[i] === 3) {
      y += this.optionsRadius * 0.1;
    }

    const nSides = this.playerOptions[i];
    drawPolygon(x, y, this.optionsRadius, -HALF_PI, nSides);
  }

  draw() {
    this.answerKey.forEach((nSides, i) => {
      // Always draw underlying circles
      const { answersY } = this;
      const answerX = map(
        i,
        0,
        this.answerKey.length - 1,
        this.minX,
        this.maxX,
      );
      ellipse(answerX, answersY, this.radius * 2.4);

      this.drawAnswer(answerX, i);
      this.drawOption(i);
    });
  }
}

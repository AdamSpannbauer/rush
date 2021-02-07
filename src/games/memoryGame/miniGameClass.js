import MiniGame from "../../miniGameBase.js";
import { drawPolygon, shuffle } from "../../utils.js";

export default class MemoryGame extends MiniGame {
  constructor() {
    super({
      name: "Memory Game",
      instructions: "Memorize the shapes",
      props: {},
    });

    this.memoryStart = Date.now();
    this.totalMemorySeconds = 2.5;

    this.playerOptions = [3, 4, 5, 6];
    this.answerKey = [...this.playerOptions];
    this.radius = min([width, height]) / 6;
    this.optionsRadius = min([width, height]) / 12;

    let offset = (this.answerKey.length / 2) * this.optionsRadius * 2;
    this.minOptionsX = width / 2 - offset;
    this.maxOptionsX = width / 2 + offset;

    offset = (this.answerKey.length / 2) * this.radius * 2;
    this.minX = width / 2 - offset;
    this.maxX = width / 2 + offset;

    shuffle(this.answerKey);
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
    shuffle(this.answerKey);
  }

  update(events) {
    if (this.memoryStage) {
      this.resetTime();
    }
    // TODO: write an update method (required)
    // Examples with events:
    //  if (events.mousePressed) {//do stuff}
    //  if (events.mouseReleased) {//do stuff}
  }

  draw() {
    this.answerKey.forEach((nSides, i) => {
      const answerY = height * 0.4;
      const answerX = map(
        i,
        0,
        this.answerKey.length - 1,
        this.minX,
        this.maxX
      );
      ellipse(answerX, answerY, this.radius * 2.4);
      if (this.memoryStage) {
        let y = answerY;
        // Triangle looks better adjusted down
        if (nSides === 3) {
          y += this.radius * 0.1;
        }
        drawPolygon(answerX, y, this.radius, -HALF_PI, nSides);
      } else {
        const x = map(
          i,
          0,
          this.answerKey.length - 1,
          this.minOptionsX,
          this.maxOptionsX
        );
        let y = height * 0.75;
        // Triangle looks better adjusted down
        if (this.playerOptions[i] === 3) {
          y += this.optionsRadius * 0.1;
        }

        drawPolygon(x, y, this.optionsRadius, -HALF_PI, this.playerOptions[i]);
      }
    });
  }
}

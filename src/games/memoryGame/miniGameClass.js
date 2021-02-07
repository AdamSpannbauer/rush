import MiniGame from "../../miniGameBase.js";
import { drawPolygon, shuffle } from "../../utils.js";

export default class MemoryGame extends MiniGame {
  constructor() {
    super({
      name: "Memory Game",
      instructions: "Memorize the shapes",
      props: {},
    });

    this.totalMemoryTime = 2;
    this.answerKey = [3, 4, 5, 6];
    this.radius = min([width, height]) / 6;

    this.offset = (this.answerKey.length / 2) * this.radius * 2;
    this.minX = width / 2 - this.offset;
    this.maxX = width / 2 + this.offset;

    shuffle(this.answerKey);
  }

  resetGame() {
    shuffle(this.answerKey);
  }

  update(events) {
    // TODO: write an update method (required)
    // Examples with events:
    //  if (events.mousePressed) {//do stuff}
    //  if (events.mouseReleased) {//do stuff}
  }

  draw() {
    this.answerKey.forEach((nSides, i) => {
      const x = map(i, 0, this.answerKey.length - 1, this.minX, this.maxX);
      let y = height / 2;

      ellipse(x, y, this.radius * 2.4);
      if (nSides === 3) {
        y += this.radius * 0.1;
      }

      drawPolygon(x, y, this.radius, -HALF_PI, nSides);
    });
  }
}

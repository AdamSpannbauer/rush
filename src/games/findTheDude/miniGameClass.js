import MiniGame from '../../miniGameBase.js';

export default class FindTheDude extends MiniGame {
  constructor() {
    super({ name: 'Find the Dude', instructions: 'Find the Dude!', props: {} });

    this.dudeX = random(width);
    this.dudeY = random(height);
    this.dudeR = 15;
    this.spotlightR = width * 0.6;
  }

  resetGame() {
    this.dudeX = random(width);
    this.dudeY = random(height);
  }

  checkFound() {
    if (dist(mouseX, mouseY, this.dudeX, this.dudeY) < this.dudeR) {
      this.gameOver = true;
      this.gameWon = true;
    }
  }

  update(events) {
    this.checkFound();
  }

  draw() {
    background(0);
    fill(255, 100);
    ellipse(mouseX, mouseY, this.spotlightR * 2);
    fill(0, 255, 0);
    if (dist(mouseX, mouseY, this.dudeX, this.dudeY) < 300) {
      ellipse(this.dudeX, this.dudeY, this.dudeR * 2);
    }
    noFill();
    strokeWeight(width);
    stroke(0);
    ellipse(mouseX, mouseY, this.spotlightR * 2);
  }
}

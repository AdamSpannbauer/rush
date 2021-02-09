import MiniGame from '../../miniGameBase.js';

export default class FindTheDude extends MiniGame {
  constructor() {
    super({ name: 'Find the Dude', instructions: 'Find the Dude!' });

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

  update() {
    this.checkFound();
  }

  draw() {
    push();
    background(0);

    // Draw spotlight's white circle
    fill(255, 100);
    ellipse(mouseX, mouseY, this.spotlightR * 2);

    // Draw dude if close-ish to avoid
    // accidentally showing dude outside of spotligh
    if (dist(mouseX, mouseY, this.dudeX, this.dudeY) < 300) {
      fill(0, 255, 0);
      ellipse(this.dudeX, this.dudeY, this.dudeR * 2);
    }

    // Mask image besides spotlight area
    // by drawing verrrry thick bordered circle
    // hacky but easy
    noFill();
    strokeWeight(width);
    stroke(0);
    ellipse(mouseX, mouseY, this.spotlightR * 2);
    pop();
  }
}

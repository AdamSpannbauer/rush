import { MiniGame } from '../../miniGameBase.js';

export class FindTheDude extends MiniGame {
  constructor() {
    super({ name: 'Find the Dude', instructions: 'Find the Dude!' });

    this.instructions.inputs = {
      usesMouseClick: false,
      usesMouseHover: true,
      usesArrowKeys: false,
      usesSpaceBar: false,
      usesKeyboard: false,
    };

    this.dudeX = random(width);
    this.dudeY = random(height);
    this.dudeR = 15;
    this.spotlightR = width * 0.6;

    this.dudeIcons = [
      '\uf535', // kiwi bird
      '\uf6ed', // hippo
      '\uf182', // woman
      '\uf183', // man
      '\uf6d5', // dragon
      '\uf6e2', // ghost
      '\uf29d', // blind man
      '\uf77c', // baby
      '\uf6e2', // ghost
      '\uf6be', // cat
    ];
    this.dudeIcon = random(this.dudeIcons);
  }

  resetGame() {
    this.dudeX = random(width);
    this.dudeY = random(height);
    this.dudeIcon = random(this.dudeIcons);
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

  drawDude() {
    push();
    fill(100, 255, 100);
    strokeWeight(3);

    textFont(this.fontAwesome);
    textSize(this.dudeR * 2);
    textAlign(CENTER, CENTER);

    text(this.dudeIcon, this.dudeX, this.dudeY);
    pop();
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
      this.drawDude();
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

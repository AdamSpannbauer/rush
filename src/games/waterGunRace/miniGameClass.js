import { MiniGame } from '../../miniGameBase.js';

export class WaterGunRace extends MiniGame {
  constructor() {
    super({ name: 'Water Gun Race', instructions: 'Hit the Target!' });

    this.instructions.inputs = {
      usesMouseClick: false,
      usesMouseHover: true,
      usesArrowKeys: false,
      usesSpaceBar: false,
      usesKeyboard: false,
    };

    this.ballR = min([width, height]) * 0.175;
    this.targetR = this.ballR / 4;

    this.minX = width / 2 - width * 0.25;
    this.maxX = width / 2 + width * 0.25;
    this.minY = height / 2;
    this.maxY = height;

    this.x = 0;
    this.y = 0;
    this.noiseSeed = random(100);
    this.noiseStep = 0.005;

    this.successPercent = 0.4;
    this.timeOnTarget = 0;

    this.horseR = min([width, height]) * 0.075;
    this.horseY = height / 4;

    this.update();
  }

  resetGame() {
    this.timeOnTarget = 0;
    this.noiseSeed = random(100);
  }

  get percentOnTarget() {
    return this.timeOnTarget / this.maxSeconds;
  }

  get horseFinished() {
    this.gameWon = this.percentOnTarget >= this.successPercent;
    return this.gameWon;
  }

  get horseX() {
    return map(this.percentOnTarget, 0, this.successPercent, 0, width - this.horseR * 2, true);
  }

  updateGameState() {
    if (this.horseFinished || this.secondsElapsed > this.maxSeconds) {
      this.gameOver = true;
    }
  }

  updateScore() {
    if (this.gameOver) return;

    const mouseTargetDist = dist(this.x, this.y, mouseX, mouseY);
    if (mouseTargetDist < this.targetR && frameRate() > 0) {
      this.timeOnTarget += 1 / frameRate();
    }
  }

  updateTargetLoc() {
    if (this.gameOver) return;

    this.x = map(noise(this.noiseSeed), 0, 1, this.minX, this.maxX);
    this.y = map(noise(this.noiseSeed, 10), 0, 1, this.minY, this.maxY);
    this.noiseSeed += this.noiseStep;
  }

  update() {
    this.updateGameState();
    this.updateScore();
    this.updateTargetLoc();
  }

  drawTarget() {
    push();
    fill(255);
    ellipse(this.x, this.y, this.ballR * 2);

    fill(255, 100, 100);
    ellipse(this.x, this.y, this.ballR * 0.75 * 2);

    fill(255);
    ellipse(this.x, this.y, this.ballR * 0.5 * 2);

    fill(255, 100, 100);
    this.drawIcon('\uf245', this.x * 1.01, this.y, this.targetR * 2);

    fill(0);
    stroke(255);
    textAlign(CENTER, CENTER);
    textSize(this.targetR * 0.5);
    text('HOVER', this.x, this.y - this.targetR * 2.3);
    text('HERE', this.x, this.y + this.targetR * 2.3);
    pop();
  }

  drawHorse() {
    push();
    fill(255);
    noStroke();

    const angle = map(sin(this.horseX * 0.01), -1, 1, QUARTER_PI, -QUARTER_PI);

    translate(this.horseX, this.horseY);
    rotate(angle);

    this.drawIcon('\uf6f0', 0, 0, this.horseR * 2);
    pop();
  }

  drawCourse() {
    push();
    noStroke();
    this.drawIcon('\uf43c', width - this.horseR, this.horseY - this.horseR, this.horseR * 2);
    this.drawIcon('\uf43c', width - this.horseR, this.horseY + this.horseR, this.horseR * 2);

    stroke(150, 255);
    strokeWeight(10);

    const y1 = this.horseY - this.horseR * 2;
    const y2 = this.horseY + this.horseR * 2.25;
    line(0, y1, width, y1);
    line(0, y2, width, y2);
    pop();
  }

  draw() {
    this.drawHorse();
    this.drawTarget();
    this.drawCourse();
  }
}

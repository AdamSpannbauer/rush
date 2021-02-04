import MiniGame from '../../miniGameBase.js';

export default class WaterGunRace extends MiniGame {
  constructor() {
    super({ name: 'Water Gun Race', instructions: 'Hit the Target!', props: {} });

    this.ballR = 90;
    this.targetR = this.ballR / 4;

    this.minX = (width / 2) - width * 0.25;
    this.maxX = (width / 2) + width * 0.25;
    this.minY = height / 2;
    this.maxY = height;

    this.x = 0;
    this.y = 0;
    this.noiseSeed = random(100);
    this.noiseStep = 0.005;

    this.successPercent = 0.6;
    this.timeOnTarget = 0;

    this.horseR = 40;
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

  updateGameState() {
    if (this.horseFinished || this.secondsElapsed > this.maxSeconds) {
      this.gameOver = true;
    }
  }

  updateScore() {
    if (this.gameOver) return;

    const mouseTargetDist = dist(this.x, this.y, mouseX, mouseY);
    if (mouseTargetDist < this.targetR && frameRate() > 0) {
      this.timeOnTarget += (1 / frameRate());
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

  draw() {
    const horseX = map(this.percentOnTarget, 0, this.successPercent, 0, width, true);

    push();
    fill(255);
    ellipse(horseX, this.horseY, this.horseR * 2);
    ellipse(this.x, this.y, this.ballR * 2);

    fill(255, 100, 100);
    ellipse(this.x, this.y, (this.ballR * 0.75) * 2);
    fill(255);
    ellipse(this.x, this.y, (this.ballR * 0.5) * 2);
    fill(255, 100, 100);
    ellipse(this.x, this.y, this.targetR * 2);
    pop();
  }
}

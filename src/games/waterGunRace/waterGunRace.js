import MiniGame from '../../miniGameBase.js';

export default class WaterGunRace extends MiniGame {
  constructor() {
    super({ name: 'Water Gun Race', props: {} });

    this.ballR = 80;
    this.targetR = 30;

    this.minX = 0;
    this.maxX = width;
    this.minY = height / 2;
    this.maxY = height;

    this.x = 0;
    this.y = 0;
    this.noiseSeed = random(100);
    this.noiseStep = 0.005;

    this.successPercent = 0.7;
    this.maxSeconds = 5;
    this.startTime = Date.now();
    this.timeOnTarget = 0;

    this.horseR = 40;
    this.horseY = height / 4;

    this.update();
  }

  get percentOnTarget() {
    return this.timeOnTarget / this.maxSeconds;
  }

  get playerHasWon() {
    this.gameWon = this.percentOnTarget >= this.successPercent;
    return this.gameWon;
  }

  updateGameState() {
    if (this.playerHasWon || this.secondsElapsed > this.maxSeconds) {
      this.gameOver = true;
    }
  }

  updateScore() {
    const d = dist(this.x, this.y, mouseX, mouseY);
    if (d < this.targetR && frameRate() > 0) {
      this.timeOnTarget += (1 / frameRate());
    }
  }

  updateTargetLoc() {
    this.x = map(noise(this.noiseSeed), 0, 1, this.minX, this.maxX);
    this.y = map(noise(this.noiseSeed, 10), 0, 1, this.minY, this.maxY);
    this.noiseSeed += this.noiseStep;
  }

  update() {
    this.updateGameState();
    if (this.gameOver) return;
    this.updateScore();
    this.updateTargetLoc();
  }

  draw() {
    const horseX = map(this.percentOnTarget, 0, this.successPercent, 0, width, true);

    push();
    fill(255);
    ellipse(horseX, this.horseY, this.horseR * 2);
    ellipse(this.x, this.y, this.ballR * 2);

    fill(255, 230, 180);
    ellipse(this.x, this.y, this.targetR * 2);
    pop();
  }
}

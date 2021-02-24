import { MiniGame } from '../../miniGameBase.js';
import { Ball } from './ball.js';
import { Hole } from './hole.js';

const dashedLine = ({
  x1, y1, x2, y2, nSegments = 10,
}) => {
  let ax;
  let ay;
  let bx;
  let by;
  for (let i = 1; i < nSegments * 2; i += 2) {
    ax = map(i - 1, 0, nSegments * 2, x1, x2);
    ay = map(i - 1, 0, nSegments * 2, y1, y2);
    bx = map(i, 0, nSegments * 2, x1, x2);
    by = map(i, 0, nSegments * 2, y1, y2);
    line(ax, ay, bx, by);
  }
};

export class GolfPutt extends MiniGame {
  constructor() {
    super({ name: 'Golf Putt', instructions: 'Sink the Putt!' });

    this.instructions.inputs = {
      usesMouseClick: false,
      usesMouseHover: false,
      usesArrowKeys: true,
      usesSpaceBar: true,
      usesKeyboard: false,
    };

    this.holeR = width * 0.125;
    this.ballR = width * 0.05;

    this.minHoleX = width * 0.5 + this.holeR * 2;
    this.maxHoleX = width - this.holeR;
    this.minHoleY = this.holeR;
    this.maxHoleY = height - this.holeR;

    this.minBallX = this.ballR;
    this.maxBallX = width * 0.5 - this.ballR * 2;
    this.minBallY = this.ballR;
    this.maxBallY = height - this.ballR;

    this.hole = new Hole({ r: this.holeR });
    this.ball = new Ball({ r: this.ballR });
    this.hitAngle = random(-HALF_PI, HALF_PI);
    this.deltaAngle = 0.01;
    this.ballSpeed = max([width, height]) * 0.01;

    this.resetHoleXY();
    this.resetBallXY();
  }

  resetHoleXY() {
    this.hole.x = random(this.minHoleX, this.maxHoleX);
    this.hole.y = random(this.minHoleY, this.maxHoleY);
  }

  resetBallXY() {
    this.ball.x = random(this.minBallX, this.maxBallX);
    this.ball.y = random(this.minBallY, this.maxBallY);
  }

  resetGame() {
    this.resetHoleXY();
    this.resetBallXY();
    this.distToHole = dist(this.hole.x, this.hole.y, this.ball.x, this.ball.y);
    this.ballHit = false;
  }

  checkBallInHole() {
    this.distToHole = dist(this.hole.x, this.hole.y, this.ball.x, this.ball.y);
    if (this.distToHole < this.hole.r - this.ball.r) {
      this.gameOver = true;
      this.gameWon = true;
    }
  }

  moveBall() {
    const v = createVector(this.ballSpeed, 0);
    v.rotate(this.hitAngle);
    this.ball.p.add(v);
  }

  update() {
    this.checkBallInHole();

    if (this.ballHit) {
      this.moveBall();
      return;
    }

    if (keyIsDown(RIGHT_ARROW) || keyIsDown(DOWN_ARROW)) {
      this.hitAngle += this.deltaAngle;
    }

    if (keyIsDown(LEFT_ARROW) || keyIsDown(UP_ARROW)) {
      this.hitAngle -= this.deltaAngle;
    }

    if (this.events.keyWasPressed(' ')) {
      this.ballHit = true;
    }
  }

  drawHitAngle() {
    push();
    translate(this.ball.x, this.ball.y);
    rotate(this.hitAngle);
    stroke(250, 250, 0);
    strokeWeight(10);
    strokeCap(SQUARE);

    dashedLine({
      x1: 0, y1: 0, x2: this.distToHole * 1.1, y2: 0, nSegments: 5,
    });
    pop();
  }

  draw() {
    background(30, 80, 40);

    if (!this.ballHit) this.drawHitAngle();
    this.hole.draw();
    this.ball.draw();
  }
}

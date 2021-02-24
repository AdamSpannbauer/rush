import { MiniGame } from '../../miniGameBase.js';
import { dashedLine } from '../../utils.js';
import { Moon } from './moon.js';
import { Rocket } from './rocket.js';

export class ToTheMoon extends MiniGame {
  constructor() {
    super({ name: 'To the Moon', instructions: 'To the Moon!' });

    this.instructions.inputs = {
      usesMouseClick: true,
      usesMouseHover: false,
      usesArrowKeys: false,
      usesSpaceBar: false,
      usesKeyboard: false,
    };

    const moonR = width * 0.25;
    this.moon = new Moon({ x: width / 2, y: -moonR * 0.25, r: moonR });
    this.rocket = new Rocket({});

    this.rocketSpeed = 5;

    this.deltaAngle = 0.05;
    this.maxAngle = -QUARTER_PI;
    this.minAngle = -3 * QUARTER_PI;
    this.launchAngle = this.minAngle;

    this.launched = false;
  }

  get launchAngle() {
    return this.rocket.launchAngle;
  }

  set launchAngle(a) {
    this.rocket.launchAngle = a;
  }

  resetGame() {
    this.rocket = new Rocket({
      x: width / 2,
      y: height * 0.9,
      fontAwesome: this.fontAwesome,
      iconSize: height * 0.1,
    });
    this.launchAngle = random(this.minAngle, this.maxAngle);
    this.launched = false;
  }

  checkToMoon() {
    this.distToMoon = dist(this.moon.x, this.moon.y, this.rocket.x, this.rocket.y);
    if (this.distToMoon < this.moon.r * 1.1) {
      this.gameOver = true;
      this.gameWon = true;
    }
  }

  moveRocket() {
    const v = createVector(this.rocketSpeed, 0);
    v.rotate(this.launchAngle);
    this.rocket.p.add(v);
  }

  update() {
    this.checkToMoon();
    if (this.launched) {
      this.moveRocket();
      return;
    }

    if (this.events.mousePressed || this.events.keyWasPressed(' ')) {
      this.launched = true;
    } else {
      if (this.launchAngle <= this.minAngle) {
        this.deltaAngle = abs(this.deltaAngle);
      } else if (this.launchAngle >= this.maxAngle) {
        this.deltaAngle = -abs(this.deltaAngle);
      }

      this.rocket.launchAngle += this.deltaAngle;
    }
  }

  drawLaunchAngle() {
    push();
    translate(this.rocket.x, this.rocket.y);
    rotate(this.launchAngle);
    stroke(255, 100);
    strokeWeight(10);
    strokeCap(SQUARE);

    dashedLine({
      x1: this.rocket.iconSize, y1: 0, x2: height, y2: 0, nSegments: 5,
    });
    pop();
  }

  drawThrust() {
    push();
    translate(this.rocket.x, this.rocket.y);
    rotate(this.launchAngle + 3 * HALF_PI);
    translate(-this.rocket.iconSize * 0.05, -this.rocket.iconSize * 0.5);

    fill(255, 0, 0, 200);
    noStroke();

    textFont(this.fontAwesome);
    textSize(this.rocket.iconSize * 0.3);
    textAlign(CENTER, CENTER);
    text('\uf06d', 0, 0);
    pop();
  }

  draw() {
    this.moon.draw();

    if (!this.launched) {
      this.drawLaunchAngle();
    } else {
      this.drawThrust();
    }
    this.rocket.draw();
  }
}

import { MiniGame } from "../../miniGameBase.js";
import { alphabet } from "./alphabet.js";

export class SaveTheEarth extends MiniGame {
  constructor() {
    super({ name: "Save the Earth", instructions: "Save the Earth!" });

    this.instructions.inputs = {
      usesMouseClick: false,
      usesMouseHover: false,
      usesArrowKeys: false,
      usesSpaceBar: false,
      usesKeyboard: true,
    };

    this.homeBaseR = 50;
    this.playScreenWidth = min([width, height]);
    this.x0 = (width - this.playScreenWidth) / 2;
    this.x1 = this.x0 + this.playScreenWidth;

    this.spawnEveryNFrames = 40;
    this.frameCount = 0;

    this.enemySpeed = min([width, height]) * 0.0035;
    this.enemyR = 30;

    this.gameWon = true;
    this.enemies = [];
  }

  resetGame() {
    this.gameWon = true;
    this.frameCount = 0;
    this.enemies = [];
  }

  spawnEnemy() {
    const rand = random();

    let x;
    let y;
    if (rand < 0.25) {
      // off left
      x = this.x0 - this.enemyR;
      y = random(height);
    } else if (rand < 0.5) {
      // off right
      x = this.x1 + this.enemyR;
      y = random(height);
    } else if (rand < 0.75) {
      // off top
      x = random(this.x0, this.x1);
      y = -this.enemyR;
    } else {
      // off bottom
      x = random(this.x0, this.x1);
      y = height + this.enemyR;
    }

    return {
      pos: createVector(x, y),
      angle: atan2(height / 2 - y, width / 2 - x),
      dead: false,
      letter: random(alphabet.split("")),
    };
  }

  updateEnemies() {
    this.enemies.forEach((enemy) => {
      if (enemy.dead || this.gameOver) return;

      const homeD = dist(width / 2, height / 2, enemy.pos.x, enemy.pos.y);
      if (homeD < this.homeBaseR + this.enemyR) {
        this.gameOver = true;
        this.gameWon = false;
        return;
      }

      if (this.events.keyWasPressed(enemy.letter)) {
        // eslint-disable-next-line no-param-reassign
        enemy.dead = true;
      }

      const velocity = createVector(this.enemySpeed, 0);
      velocity.rotate(enemy.angle);
      enemy.pos.add(velocity);
    });

    this.enemies = this.enemies.filter((e) => !e.dead);
  }

  update() {
    if (this.frameCount % this.spawnEveryNFrames === 0) {
      this.enemies.push(this.spawnEnemy());
    }

    this.updateEnemies();
    this.frameCount += 1;
  }

  draw() {
    background(130);
    this.drawIcon("\uf57d", width / 2, height / 2, this.homeBaseR * 2);
    fill(0);
    rect(0, 0, this.x0, height);
    rect(this.x1, 0, width, height);

    this.enemies.forEach((enemy) => {
      const { x, y } = enemy.pos;

      textAlign(CENTER, CENTER);
      fill(220);
      this.drawIcon("\uf67b", x, y, this.enemyR * 2);
      textSize(20);
      fill(130);
      text(enemy.letter, x, y + this.enemyR * 0.2);
    });
  }
}

import { MiniGame } from "../../miniGameBase.js";

export class ProtectTheCenter extends MiniGame {
  constructor() {
    super({ name: "Protect the Center", instructions: "Protect the center!" });

    this.instructions.inputs = {
      usesMouseClick: true,
      usesMouseHover: false,
      usesArrowKeys: false,
      usesSpaceBar: false,
      usesSpecificKeys: [],
    };

    this.homeBaseR = 50;

    this.spawnEveryNFrames = 10;
    this.frameCount = 0;

    this.enemySpeed = min([width, height]) * 0.002;
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
      x = -this.enemyR;
      y = random(height);
    } else if (rand < 0.5) {
      // off right
      x = width + this.enemyR;
      y = random(height);
    } else if (rand < 0.75) {
      // off top
      x = random(width);
      y = -this.enemyR;
    } else {
      // off bottom
      x = random(width);
      y = height + this.enemyR;
    }

    return {
      pos: createVector(x, y),
      angle: atan2(height / 2 - y, width / 2 - x),
      dead: false,
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

      if (this.events.mousePressed) {
        const mouseD = dist(mouseX, mouseY, enemy.pos.x, enemy.pos.y);
        // eslint-disable-next-line no-param-reassign
        enemy.dead = mouseD <= this.enemyR;
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
    ellipse(width / 2, height / 2, this.homeBaseR * 2);

    this.enemies.forEach((enemy) => {
      const { x, y } = enemy.pos;
      ellipse(x, y, this.enemyR * 2);
    });
  }
}

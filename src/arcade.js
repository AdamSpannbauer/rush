import { shuffle } from "./utils.js";

export class Arcade {
  constructor({ games, lives = 5, events = {} }) {
    this.games = games;
    shuffle(this.games);

    this.lives = lives;
    this.events = events;

    this.activeGameIndex = 0;
    this.activeGame = null;
    // TODO: have player decide when rush starts
    this.rushStarted = true;
    this.gamesWon = 0;
    this.gameOver = false;
  }

  updateActiveGame() {
    if (this.activeGame.percentElapsed >= 1) {
      this.activeGame.gameOver = true;
    }

    if (this.activeGame.gameOver) {
      const gameLost = !this.activeGame.gameWon;
      if (gameLost) {
        this.lives -= 1;
      } else {
        this.gamesWon += 1;
      }

      this.activeGame = null;
    } else {
      this.activeGame.update();
    }
  }

  update() {
    if (this.activeGame && !this.gameOver) {
      this.updateActiveGame();

      if (this.lives <= 0) {
        this.gameOver = true;
        this.activeGame = null;
      }
    } else if (!this.activeGame && this.rushStarted && !this.gameOver) {
      this.activeGameIndex += 1;
      const i = this.activeGameIndex % this.games.length;

      this.activeGame = this.games[i];
      this.activeGame.events = this.events;
      this.activeGame.reset();
    }
  }

  drawTimer() {
    // TODO: replace with nicer graphic for time
    push();
    fill(255, 100);
    stroke(0);
    rect(0, height - 50, width * (1 - this.activeGame.percentElapsed), 50);
    pop();
  }

  drawLives() {
    // TODO: replace with nicer graphic for lives
    push();
    textAlign(CENTER, CENTER);
    textSize(30);

    fill(0);
    stroke(255);
    strokeWeight(3);

    text(`Lives remaining: ${this.lives}`, width / 2, textSize() * 2);
    pop();
  }

  drawInstructions() {
    if (this.activeGame.percentElapsed > 0.2) return;
    this.activeGame.instructions.draw();
  }

  drawHUD() {
    // TODO: other elements of HUD? add games won?
    this.drawTimer();
    this.drawLives();
    this.drawInstructions();
  }

  drawGameOver() {
    // TODO: pretty me
    push();
    textAlign(CENTER, CENTER);
    textSize(50);

    fill(0);
    stroke(255, 0, 0);
    strokeWeight(3);

    text(
      `GAME OVER\n${this.gamesWon} game${this.gamesWon === 1 ? "" : "s"} won`,
      width / 2,
      height / 2
    );
    pop();
  }

  draw() {
    if (this.activeGame) {
      push();
      this.activeGame.draw();
      pop();

      this.drawHUD();
    } else if (this.gameOver) {
      this.drawGameOver();
    }
  }
}

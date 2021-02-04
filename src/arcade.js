const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

export default class Arcade {
  constructor({ games, lives = 5 }) {
    this.games = games;
    shuffle(this.games);

    this.lives = lives;

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
      this.activeGame.reset();
    } else {
      // this.updateSelectScreen();
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

  drawHUD() {
    // TODO: other elements of HUD? add games won?
    this.drawTimer();
    this.drawLives();
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
      `GAME OVER\n${this.gamesWon} game${this.gamesWon === 1 ? '' : 's'} won`,
      width / 2,
      height / 2,
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
    } else {
      this.drawSelectScreen();
    }
  }

  updateSelectScreen() {
    // TODO: write logic to start game (include some difficulty selection)
  }

  drawSelectScreen() {
    // TODO: make this pretty
    push();
    translate(width / 2, 0);
    textAlign(CENTER, CENTER);

    const lineHeight = textSize() * 1.5;

    this.games.forEach((g, i) => {
      text(g.name, 0, i * lineHeight);
    });
    pop();
  }
}

import { shuffle } from './utils.js';

export class Arcade {
  constructor({
    games, lives = 5, events = {}, fontAwesome = null,
  }) {
    this.games = games;
    shuffle(this.games);

    this.lives = lives;
    this.events = events;
    this.fontAwesome = fontAwesome;

    this.maxGameIntroSeconds = 2;
    this.gameIntroStartTime = Date.now();

    this.activeGameIndex = 0;
    this.activeGame = null;
    // TODO: have player decide when rush starts
    this.rushStarted = true;
    this.gamesWon = 0;
    this.gameOver = false;

    this.setUpNextGame();
  }

  get showingGameIntro() {
    const elapsed = Date.now() - this.gameIntroStartTime;
    return this.maxGameIntroSeconds > elapsed / 1000;
  }

  setUpNextGame() {
    this.activeGameIndex += 1;
    const i = this.activeGameIndex % this.games.length;

    this.activeGame = this.games[i];
    this.activeGame.events = this.events;

    this.gameIntroStartTime = Date.now();
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

      this.setUpNextGame();
    } else {
      this.activeGame.update();
    }
  }

  update() {
    if (!this.showingGameIntro && !this.gameOver) {
      this.updateActiveGame();

      if (this.lives <= 0) {
        this.gameOver = true;
        this.activeGame = null;
      }
    } else if (this.showingGameIntro && this.rushStarted && !this.gameOver) {
      this.activeGame.reset();
    }
  }

  drawTimer() {
    push();
    fill(255, 100);
    stroke(0);
    rect(0, height - 50, width * (1 - this.activeGame.percentElapsed), 50);
    pop();
  }

  drawLives() {
    let lifeIcon;

    if (this.lives > 2) {
      // lifeIcon = '\uf007 '; // user
      lifeIcon = '\uf118 '; // smile face
    } else if (this.lives === 2) {
      // lifeIcon = '\uf128 '; // injured user
      lifeIcon = '\uf11a '; // meh face
    } else if (this.lives === 1) {
      // lifeIcon = '\uf683 '; // praying stick man
      lifeIcon = '\uf119 '; // frown face
    }

    push();
    textAlign(CENTER, CENTER);
    textSize(50);

    fill(0);
    stroke(255);
    strokeWeight(3);

    textFont(this.fontAwesome);
    text(`${lifeIcon.repeat(this.lives)}`, width / 2, textSize());
    pop();
  }

  drawInstructions() {
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
      `GAME OVER\n${this.gamesWon} game${this.gamesWon === 1 ? '' : 's'} won`,
      width / 2,
      height / 2,
    );
    pop();
  }

  draw() {
    if (this.gameOver) {
      this.drawGameOver();
      return;
    }

    if (!this.showingGameIntro && this.activeGame) {
      push();
      this.activeGame.draw();
      pop();

      this.drawTimer();
      this.drawLives();
    } else {
      this.drawInstructions();
      this.drawLives();
    }
  }
}

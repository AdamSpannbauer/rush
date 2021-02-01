export default class Arcade {
  constructor({ games, lives = 3 }) {
    this.games = games;
    this.lives = lives;
    this.activeGame = null;
  }

  update() {
    if (this.activeGame) {
      if (this.activeGame.gameOver) {
        // TODO: Should game have a 'success' flag to check here?
        this.activeGame = null;
      } else {
        this.activeGame.update();
      }
    } else {
      this.updateSelectScreen();
    }
  }

  draw() {
    if (this.activeGame) {
      this.activeGame.draw();
    } else {
      this.drawSelectScreen();
    }
  }

  updateSelectScreen(key) {
    const i = parseInt(key, 10);
    if (!Number.isNaN(i) && i >= 0 && i < this.games.length) {
      this.activeGame = this.games[i];
    }
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

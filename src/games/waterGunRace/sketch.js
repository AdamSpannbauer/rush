import WaterGunRace from './waterGunRace.js';

let game;

function setup() {
  createCanvas(windowWidth, windowHeight);
  game = new WaterGunRace();
}

function draw() {
  if (game.gameOver) noLoop();

  if (game.gameOver) {
    if (game.gameWon) {
      background(0, 255, 0);
    } else {
      background(255, 0, 0);
    }
  } else {
    background(0);
    rect(0, height - 50, width * (1 - game.percentElapsed), 50);
  }

  game.update();
  game.draw();
}

window.setup = setup;
window.draw = draw;

// Replace `YourMiniGame` in the import statement
// below.  Do not change the alias UserMiniGame as it is used
// in the remainder of this script.
import { PopupCloser as UserMiniGame } from "./miniGameClass.js";

let game;

function setup() {
  createCanvas(windowWidth, windowHeight);
  game = new UserMiniGame();
}

function draw() {
  if (game.gameOver) noLoop();

  if (game.percentElapsed >= 1) {
    game.gameOver = true;
  }

  if (game.gameOver) {
    if (game.gameWon) {
      background(0, 255, 0);
    } else {
      background(255, 0, 0);
    }
  } else {
    background(0);
  }

  push();
  game.update();
  game.draw();
  pop();

  fill(255, 100);
  stroke(0);
  rect(0, height - 50, width * (1 - game.percentElapsed), 50);

  game.events.reset();
}

window.setup = setup;
window.draw = draw;

window.mousePressed = () => game.events.logMousePressed();
window.touchStarted = () => game.events.logMousePressed();

window.mouseReleased = () => game.events.logMouseReleased();
window.touchEnded = () => game.events.logMouseReleased();

window.keyPressed = () => game.events.logKeyPressed(key);
window.keyReleased = () => game.events.logKeyReleased(key);

import Game from './miniGameClass.js';

let game;
let events = {};

function touchStarted() {
  events.mousePressed = true;
}

function touchEnded() {
  events.mouseReleased = true;
}

function mousePressed() {
  touchStarted();
}

function mouseReleased() {
  touchEnded();
}

function keyPressed() {
  events.keysPressed.push(key.toLowerCase());
}

function keyReleased() {
  events.keysReleased.push(key.toLowerCase());
}

function resetEvents() {
  events = {
    mousePressed: false,
    mouseReleased: false,
    keysPressed: [],
    keysReleased: [],
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  game = new Game();
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
  game.update(events);
  game.draw();
  pop();

  fill(255, 100);
  stroke(0);
  rect(0, height - 50, width * (1 - game.percentElapsed), 50);

  resetEvents();
}

window.mousePressed = mousePressed;
window.mouseReleased = mouseReleased;

window.touchStarted = touchStarted;
window.touchEnded = touchEnded;

window.keyPressed = keyPressed;
window.keyReleased = keyReleased;

window.setup = setup;
window.draw = draw;

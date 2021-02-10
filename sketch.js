import { Arcade } from './src/arcade.js';
import { Events } from './src/events.js';
import { GAMES_LIST } from './src/gamesList.js';

let arcade;

function preload() {
  // TODO: Eventually consider loading assets here
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  const games = GAMES_LIST.map((Game) => new Game());
  arcade = new Arcade({
    games,
    lives: 3,
    events: new Events(),
  });
}

function draw() {
  background(0);

  fill(255, 100);
  stroke(0);

  arcade.draw();
  arcade.update();
  arcade.events.reset();
}

window.windowResized = () => resizeCanvas(windowWidth, windowHeight);
window.preload = preload;
window.setup = setup;
window.draw = draw;

window.mousePressed = () => arcade.events.logMousePressed();
window.touchStarted = () => arcade.events.logMousePressed();

window.mouseReleased = () => arcade.events.logMouseReleased();
window.touchEnded = () => arcade.events.logMouseReleased();

window.keyPressed = () => arcade.events.logKeyPressed(key);
window.keyReleased = () => arcade.events.logKeyReleased(key);

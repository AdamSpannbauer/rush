import Arcade from './src/arcade.js';
import Events from './src/events.js';
import FindTheDude from './src/games/findTheDude/miniGameClass.js';
import MemoryGame from './src/games/memoryGame/miniGameClass.js';
import ProtectTheCenter from './src/games/protectTheCenter/miniGameClass.js';
import SpotTheDifference from './src/games/spotTheDifference/miniGameClass.js';
import WaterGunRace from './src/games/waterGunRace/waterGunRace.js';

const gameClasses = [
  WaterGunRace,
  FindTheDude,
  SpotTheDifference,
  ProtectTheCenter,
  MemoryGame,
];

let arcade;

function preload() {}

function setup() {
  createCanvas(windowWidth, windowHeight);
  const games = gameClasses.map((G) => new G());
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

import Arcade from './src/arcade.js';
import FindTheDude from './src/games/findTheDude/miniGameClass.js';
import ProtectTheCenter from './src/games/protectTheCenter/miniGameClass.js';
import SpotTheDifference from './src/games/spotTheDifference/miniGameClass.js';
import WaterGunRace from './src/games/waterGunRace/waterGunRace.js';

const gameClasses = [WaterGunRace, FindTheDude, SpotTheDifference, ProtectTheCenter];

let arcade;
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function preload() {}

function setup() {
  createCanvas(windowWidth, windowHeight);
  const games = gameClasses.map((G) => new G());
  arcade = new Arcade({ games, lives: 3 });

  resetEvents();
}

function draw() {
  background(200);

  arcade.draw();
  arcade.update(events);

  resetEvents();
}

window.windowResized = windowResized;

window.mousePressed = mousePressed;
window.mouseReleased = mouseReleased;

window.touchStarted = touchStarted;
window.touchEnded = touchEnded;

window.keyPressed = keyPressed;
window.keyReleased = keyReleased;

window.preload = preload;
window.setup = setup;
window.draw = draw;

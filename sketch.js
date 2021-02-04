import Arcade from './src/arcade.js';
import FindTheDude from './src/games/findTheDude/miniGameClass.js';
import ProtectTheCenter from './src/games/protectTheCenter/miniGameClass.js';
import SpotTheDifference from './src/games/spotTheDifference/miniGameClass.js';
import WaterGunRace from './src/games/waterGunRace/waterGunRace.js';

const gameClasses = [WaterGunRace, FindTheDude, SpotTheDifference, ProtectTheCenter];

let arcade;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function preload() {}

function setup() {
  createCanvas(windowWidth, windowHeight);
  const games = gameClasses.map((G) => new G());
  arcade = new Arcade({ games, lives: 3 });
}

function draw() {
  background(200);
  arcade.draw();
  arcade.update();
}

window.preload = preload;
window.windowResized = windowResized;

window.setup = setup;
window.draw = draw;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function preload() {

}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(200);
}

export default {
  preload, setup, draw, windowResized,
};

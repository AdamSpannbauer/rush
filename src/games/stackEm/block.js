export class Block {
  constructor({
    x, y, gridWidth, gridHeight,
  }) {
    this.x = x;
    this.y = y;
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;

    this.w = width / this.gridWidth;
  }

  get pixelX() {
    return this.x * this.w;
  }

  get pixelY() {
    return height - (this.y + 1) * this.w;
  }

  draw() {
    push();
    rectMode(CORNER);
    rect(this.pixelX, this.pixelY, this.w, this.w);
    pop();
  }
}

export class Block {
  constructor({
    x, y, gridWidth,
  }) {
    this.x = x;
    this.y = y;
    this.gridWidth = gridWidth;

    this.w = width / this.gridWidth;
  }

  get pixelX() {
    return round(this.x) * this.w;
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

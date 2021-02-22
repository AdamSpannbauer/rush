export class Block {
  constructor({
    x, y, gridWidth, minGridHeight,
  }) {
    this.x = x;
    this.y = y;
    this.gridWidth = gridWidth;
    this.minGridHeight = minGridHeight;

    this.w = width / this.gridWidth;
    this.pixelGridWidth = width;

    // If too tall at current block size
    // resize based on window height
    if (this.minGridHeight * this.w > height) {
      this.w = height / this.minGridHeight;
      this.pixelGridWidth = this.w * this.gridWidth;
    }
  }

  get pixelX() {
    const adjustX = (width - this.pixelGridWidth) / 2;
    return adjustX + round(this.x) * this.w;
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

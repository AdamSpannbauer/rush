import { Block } from './block.js';

export class BlockRow {
  constructor({
    y = 0, length = 4, gridWidth = 7, minGridHeight = 6, prevRow = null,
  }) {
    this.active = true;
    this.blocks = [];

    this.gridWidth = gridWidth;
    this.minGridHeight = minGridHeight;

    this.velocity = 1;
    this.speed = 0.05;

    this.y = prevRow ? prevRow.y + 1 : y;
    this.prevRow = prevRow;

    this.generateRow(length);
  }

  get length() {
    return this.blocks.length;
  }

  get blockWidth() {
    return this.blocks[0]?.w;
  }

  get minX() {
    return min(this.blocks.map((b) => b.x));
  }

  get maxX() {
    return max(this.blocks.map((b) => b.x));
  }

  get roundMinX() {
    return round(this.minX);
  }

  get roundMaxX() {
    return round(this.maxX);
  }

  generateRow(length) {
    let len = length;
    if (this.prevRow) {
      len = this.prevRow.length;
    }

    for (let i = 0; i < len; i += 1) {
      this.blocks.push(new Block({
        x: i,
        y: this.y,
        gridWidth: this.gridWidth,
        minGridHeight: this.minGridHeight,
      }));
    }
  }

  moveRow() {
    if (this.maxX + 1 >= this.gridWidth) {
      this.velocity = -this.speed;
    } else if (this.minX <= 0) {
      this.velocity = this.speed;
    }

    this.blocks.forEach((b) => {
      // eslint-disable-next-line no-param-reassign
      b.x += this.velocity;
    });
  }

  deactivateRow() {
    this.active = false;
    if (!this.prevRow) return;

    let rmLeft = this.prevRow.roundMinX - this.roundMinX;
    if (rmLeft < 0) rmLeft = 0;

    let rmRight = this.roundMaxX - this.prevRow.roundMaxX;
    if (rmRight < 0) rmRight = 0;

    this.blocks = this.blocks.slice(rmLeft, this.blocks.length - rmRight);
  }

  update(deactivate) {
    if (!this.active) return;

    if (deactivate) {
      this.deactivateRow();
    } else {
      this.moveRow();
    }
  }

  draw() {
    this.blocks.forEach((b) => b.draw());
  }
}

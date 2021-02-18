import { Block } from './block.js';

export class BlockRow {
  constructor({
    y = 0, len = 4, gridWidth = 7, gridHeight = 5,
  }) {
    this.active = true;

    this.blocks = [];
    for (let i = 0; i < len; i += 1) {
      this.blocks.push(new Block({
        x: i, y, gridWidth, gridHeight,
      }));
    }

    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;

    this.velocity = 1;
  }

  get length() {
    return this.blocks.length;
  }

  get minX() {
    return min(this.blocks.map((b) => b.x));
  }

  get maxX() {
    return max(this.blocks.map((b) => b.x));
  }

  update(deactivate) {
    this.active = !deactivate;
    if (!this.active) return;

    if (this.maxX === this.gridWidth) {
      this.velocity = -1;
    } else if (this.minX === 0) {
      this.velocity = 1;
    }

    this.blocks.forEach((b) => {
      // eslint-disable-next-line no-param-reassign
      b.x += this.velocity;
    });
  }

  draw() {
    this.blocks.forEach((b) => b.draw());
  }
}

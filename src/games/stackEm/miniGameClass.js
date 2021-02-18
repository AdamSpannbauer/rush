import { MiniGame } from '../../miniGameBase.js';
import { BlockRow } from './blockRow.js';

export class StackEm extends MiniGame {
  constructor() {
    super({ name: 'Stack Em', instructions: 'Stack with Click' });

    this.rows = [];

    this.rowLen = 4;
    this.gridWidth = 7;
    this.gridHeight = 5;

    this.resetGame();
  }

  get topRow() {
    return this.rows[this.rows.length - 1];
  }

  resetGame() {
    this.rows = [];
    this.addRow();
  }

  addRow() {
    const y = this.rows.length;
    const len = y ? this.topRow.length : this.rowLen;

    this.rows.push(new BlockRow({
      y, len, gridWidth: this.gridWidth, gridHeight: this.gridHeight,
    }));
  }

  update() {
    if (this.topRow.active) {
      // Stop row if click or space bar pressed
      const deactivate = this.events.mousePressed || this.events.keyWasPressed(' ');
      this.topRow.update(deactivate);
    } else {
      this.addRow();
    }
  }

  draw() {
    this.rows.forEach((row) => row.draw());
  }
}

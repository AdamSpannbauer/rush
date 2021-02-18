import { MiniGame } from '../../miniGameBase.js';
import { BlockRow } from './blockRow.js';

const DEFAULT_WIN_HEIGHT = 4;

export class StackEm extends MiniGame {
  constructor() {
    super({ name: 'Stack Em', instructions: `Stack ${DEFAULT_WIN_HEIGHT}!` });

    this.rows = [];

    this.firstRowLen = 4;
    this.gridWidth = 7;
    this.winHeight = DEFAULT_WIN_HEIGHT;

    this.moveCoolDown = 3;
    this.moveCoolDownCounter = 0;

    this.resetGame();
  }

  get topRow() {
    return this.rows[this.rows.length - 1];
  }

  resetGame() {
    this.rows = [];
    this.moveCoolDownCounter = 0;
    this.blockSize = 0;
    this.addRow();
  }

  addRow() {
    const y = this.rows.length;
    const length = y ? this.topRow.length : this.firstRowLen;
    if (!this.rows) {
      // First row
      this.rows.push(new BlockRow({
        y, length, gridWidth: this.gridWidth,
      }));
    } else {
      // Generate next rows based of previous row
      this.rows.push(new BlockRow({
        prevRow: this.topRow,
      }));
    }
  }

  checkWin() {
    // Player wins if top row is stopped at win height
    if (!this.topRow.active && this.topRow.length && this.topRow.y >= this.winHeight) {
      this.gameWon = true;
      this.gameOver = true;
    }
  }

  checkLoss() {
    this.gameOver = this.topRow.length === 0;
  }

  update() {
    if (this.gameOver) return;

    if (this.topRow.active) {
      // Stop row if click or space bar pressed
      const deactivate = this.events.mousePressed || this.events.keyWasPressed(' ');

      this.topRow.update(deactivate);
      this.checkWin();
    } else {
      this.addRow();
      this.checkLoss();
    }
  }

  draw() {
    const { blockWidth } = this.rows[0];
    const pixelWinHeight = height - blockWidth * (this.winHeight + 1);

    push();
    stroke(255);
    strokeWeight(10);
    line(0, pixelWinHeight, width, pixelWinHeight);
    pop();

    this.rows.forEach((row) => row.draw());
  }
}

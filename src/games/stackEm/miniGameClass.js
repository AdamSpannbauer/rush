import { MiniGame } from '../../miniGameBase.js';
import { BlockRow } from './blockRow.js';

const DEFAULT_WIN_HEIGHT = 5;

export class StackEm extends MiniGame {
  constructor() {
    super({ name: 'Stack Em', instructions: `Stack ${DEFAULT_WIN_HEIGHT}!` });

    this.rows = [];

    this.firstRowLen = 4;
    this.winHeight = DEFAULT_WIN_HEIGHT;
    this.gridWidth = 7;
    this.minGridHeight = this.winHeight + 1;

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
        y, length, gridWidth: this.gridWidth, minGridHeight: this.minGridHeight,
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
    if (!this.topRow.active && this.topRow.length && this.topRow.y + 1 >= this.winHeight) {
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
    const pixelWinHeight = height - blockWidth * this.winHeight;
    const pixelGridWidth = blockWidth * this.gridWidth;
    const x0 = (width - pixelGridWidth) / 2;
    const x1 = x0 + pixelGridWidth;

    push();
    stroke(255);
    strokeWeight(10);
    strokeCap(SQUARE);
    line(x0, pixelWinHeight, x1, pixelWinHeight);

    noStroke();
    fill(30, 200);
    rect(0, 0, x0, height);
    rect(x1, 0, width, height);
    pop();

    this.rows.forEach((row) => row.draw());
  }
}

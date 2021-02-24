export class Hole {
  constructor({ x = 0, y = 0, r = 100 }) {
    this.p = createVector(x, y);
    this.r = r;
  }

  get x() {
    return this.p.x;
  }

  set x(x) {
    this.p.x = x;
  }

  get y() {
    return this.p.y;
  }

  set y(y) {
    this.p.y = y;
  }

  draw() {
    push();
    fill(100);
    ellipse(this.x, this.y, this.r * 2, this.r * 1.25);

    fill(0);
    const dr = this.r * 0.05;
    const r = this.r - dr;
    ellipse(this.x, this.y + dr, r * 2, r * 1.25);
    pop();
  }
}

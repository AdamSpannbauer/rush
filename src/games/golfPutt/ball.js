export class Ball {
  constructor({ x = 0, y = 0, r = 40 }) {
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
    fill(30);
    ellipse(
      this.x - this.r * 0.1,
      this.y + this.r * 0.9,
      this.r * 2,
      this.r * 0.3,
    );

    fill(255);
    ellipse(this.x, this.y, this.r * 2);
    pop();
  }
}

export class Moon {
  constructor({ x = 0, y = 0, r = 300 }) {
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
    fill(240);
    stroke(200, 100);
    strokeWeight(10);
    ellipse(this.x, this.y, this.r * 2);
    pop();
  }
}

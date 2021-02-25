export class Rocket {
  constructor({
    x = 0, y = 0, launchAngle = Math.PI * 0.75, fontAwesome = null, iconSize = 30,
  }) {
    this.p = createVector(x, y);
    this.launchAngle = launchAngle;

    this.fontAwesome = fontAwesome;
    this.icon = '\uf135';
    this.iconSize = iconSize;
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
}

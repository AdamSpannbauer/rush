export class PopupWindow {
  constructor() {
    this.w = random(width / 6, width / 2);
    this.h = random(height / 6, height / 2);

    this.x = random(this.w / 2, width - this.w / 2);
    this.y = random(this.h / 2, height - this.h / 2);

    this.answer = random(["left", "right"]);
  }

  draw() {
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, 10);
  }
}

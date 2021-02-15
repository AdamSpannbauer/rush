export class PopupWindow {
  constructor() {
    this.w = random(width / 6, width / 2);
    this.h = random(height / 6, height / 2);

    this.x = random(this.w / 2, width - this.w / 2);
    this.y = random(this.h / 2, height - this.h / 2);

    this.answer = random(["left", "right"]);

    this.buttonW = this.w * 0.1 + width * 0.05;
    this.buttonH = this.buttonW * 0.3;

    this.button1X = this.x - this.buttonW * 0.6;
    this.button2X = this.x + this.buttonW * 0.6;
    this.buttonY = this.y + this.buttonH;
  }

  click(clickX, clickY) {
    const onXLeft = abs(clickX - this.button1X) < this.buttonW / 2;
    const onXRight = abs(clickX - this.button2X) < this.buttonW / 2;
    const onY = abs(clickY - this.buttonY) < this.buttonH / 2;
    if ((!onXLeft && !onY) || (!onXRight && !onY)) {
      return;
    }

    if (
      (onXLeft && onY && this.answer !== "left") ||
      (onXRight && onY && this.answer !== "right")
    ) {
      return false;
    } else if (onXRight && onY && this.answer === "right") {
      return true;
    } else {
      return true;
    }
  }

  draw() {
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, 10);
    rect(this.button1X, this.buttonY, this.buttonW, this.buttonH);
    textAlign(CENTER);

    if (this.answer === "left") {
      text("close", this.button1X, this.buttonY);
    } else {
      text("virus", this.button1X, this.buttonY);
    }

    rect(this.button2X, this.buttonY, this.buttonW, this.buttonH);
    if (this.answer === "right") {
      text("close", this.button2X, this.buttonY);
    } else {
      text("virus", this.button2X, this.buttonY);
    }
  }
}

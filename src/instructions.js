export class Instructions {
  constructor({ text = "Win the game!", fontSize = 100 }) {
    this.text = text;
    this.fontSize = fontSize;
    this.fontAwesome = null;

    this.inputs = {
      usesMouseClick: false,
      usesMouseHover: false,
      usesArrowKeys: false,
      usesSpaceBar: false,
      usesKeyboard: false,
    };

    push();
    textSize(this.fontSize);
    this.fontWidth = textWidth(text);
    this.formatText();
    pop();
  }

  buildInputString() {
    let inputText = "";

    if (this.inputs.usesMouseClick) {
      inputText += "\uf8cc Click ";
    }
    if (this.inputs.usesMouseHover) {
      inputText += "\uf245 Hover ";
    }
    if (this.inputs.usesArrowKeys) {
      inputText += "\uf0b2 Arrow Keys ";
    }
    if (this.inputs.usesSpaceBar) {
      inputText += "\uf11c Space Bar ";
    }
    if (this.inputs.usesKeyboard) {
      inputText += "\uf11c Keyboard ";
    }

    this.inputString = inputText.trim();
  }

  drawInputString() {
    this.buildInputString();
    push();
    textSize(this.fontSize * 0.5);
    textFont(this.fontAwesome);
    text(this.inputString, width / 2, height / 2 + this.fontSize * 1.5);
    pop();
  }

  formatText() {
    const words = this.text.split(" ");
    const midpoint = floor(words.length / 2);
    const line1 = words.slice(0, midpoint).join(" ");
    const line2 = words.slice(midpoint).join(" ");

    if (textWidth(line1) > width || textWidth(line2) > width) {
      this.fontSize = width / 8;
    }

    this.text = `${line1}\n${line2}`;
  }

  draw() {
    push();
    textAlign(CENTER, CENTER);
    textSize(this.fontSize);

    fill(0);
    stroke(255);
    strokeWeight(3);

    this.drawInputString();
    text(this.text, width / 2, height / 2);
    pop();
  }
}

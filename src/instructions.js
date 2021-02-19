export class Instructions {
  constructor({ text = "Win the game!", fontSize = 100 }) {
    this.text = text;
    this.fontSize = fontSize;

    this.inputs = {
      usesMouseClick: false,
      usesMouseHover: false,
      usesArrowKeys: false,
      usesSpaceBar: false,
      usesSpecificKeys: [],
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
      inputText += "Use mouse ";
    }
    if (this.inputs.usesMouseHover) {
      inputText += "Hover mouse  ";
    }
    if (this.inputs.usesArrowKeys) {
      inputText += "Use arrow keys ";
    }
    if (this.inputs.usesSpaceBar) {
      inputText += "Use space bar ";
    }
    if (this.inputs.usesSpecificKeys.length) {
      inputText += "Use mouse ";
    }

    this.inputString = inputText;
  }

  drawInputString() {
    this.buildInputString();
    text(this.inputString, width / 2, height - this.fontSize);
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

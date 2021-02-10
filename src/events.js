export class Events {
  constructor() {
    this.reset();
  }

  reset() {
    this.mousePressed = false;
    this.mouseReleased = false;
    this.keysPressed = [];
    this.keysReleased = [];
  }

  logMousePressed() {
    this.mousePressed = true;
  }

  logMouseReleased() {
    this.mouseReleased = true;
  }

  logKeyPressed(key) {
    this.keysPressed.push(key.toLowerCase());
  }

  logKeyReleased(key) {
    this.keysReleased.push(key.toLowerCase());
  }

  keyWasPressed(key) {
    return this.keysPressed.includes(key.toLowerCase());
  }

  keyWasReleased(key) {
    return this.keysReleased.includes(key.toLowerCase());
  }
}

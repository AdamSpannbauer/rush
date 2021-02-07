export const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

export const drawPolygon = (x, y, radius, angle, nSides) => {
  push();
  translate(x, y);
  rotate(angle);

  beginShape();
  for (let a = 0; a < TWO_PI; a += TWO_PI / nSides) {
    const xi = cos(a) * radius;
    const yi = sin(a) * radius;

    vertex(xi, yi);
  }
  endShape(CLOSE);
  pop();
};

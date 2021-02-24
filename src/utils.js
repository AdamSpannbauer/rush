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

export const dashedLine = ({
  x1, y1, x2, y2, nSegments = 10,
}) => {
  // TODO: refactor me
  let ax;
  let ay;
  let bx;
  let by;
  for (let i = 1; i < nSegments * 2; i += 2) {
    ax = map(i - 1, 0, nSegments * 2, x1, x2);
    ay = map(i - 1, 0, nSegments * 2, y1, y2);
    bx = map(i, 0, nSegments * 2, x1, x2);
    by = map(i, 0, nSegments * 2, y1, y2);
    line(ax, ay, bx, by);
  }
};

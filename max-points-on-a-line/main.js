function maxPoints(points) {
  if (points.length <= 2) {
    return points.length;
  }
  const counts = {};
  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const [a, b, c] = getTriple(points[i], points[j]);
      const key = `${a},${b},${c}`;
      if (!(key in counts)) {
        counts[key] = 0;
      }
      counts[key]++;
    }
  }
  const maxCount = Math.max(...Object.values(counts));
  return Math.round((1 + Math.sqrt(1 + 8 * maxCount)) / 2);
}
function getTriple(p0, p1) {
  const [x0, y0] = p0;
  const [x1, y1] = p1;
  const dx = x1 - x0;
  const dy = y1 - y0;
  let a = dy;
  let b = -dx;
  let c = x0 * dy - y0 * dx;
  let g = gcd(a, gcd(b, c));
  if (c < 0 || (c === 0 && (b < 0 || (b === 0 && a < 0)))) {
    g = -g;
  }
  return [a / g, b / g, c / g];
}
function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  if (a === 0) return b;
  if (b === 0) return a;
  if (b > a) {
    const temp = a;
    a = b;
    b = temp;
  }
  while (true) {
    a %= b;
    if (a === 0) return b;
    b %= a;
    if (b === 0) return a;
  }
}

console.log(
  maxPoints([
    [1, 1],
    [2, 2],
    [3, 3],
  ]) === 3
);
console.log(
  maxPoints([
    [1, 1],
    [3, 2],
    [5, 3],
    [4, 1],
    [2, 3],
    [1, 4],
  ]) === 4
);
console.log(maxPoints([[0, 0]]) === 1);
console.log(
  maxPoints([
    [0, 0],
    [1, 0],
  ]) === 2
);
console.log(
  maxPoints([
    [0, 1],
    [0, 0],
    [0, 4],
    [0, -2],
    [0, -1],
    [0, 3],
    [0, -4],
  ]) === 7
);

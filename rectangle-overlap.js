function isRectangleOverlap(ra, rb) {
  const x1 = Math.max(ra[0], rb[0]);
  const y1 = Math.max(ra[1], rb[1]);
  const x2 = Math.min(ra[2], rb[2]);
  const y2 = Math.min(ra[3], rb[3]);
  const w = Math.max(0, x2 - x1);
  const h = Math.max(0, y2 - y1);
  return w * h > 0;
}

(() => {
  console.log(isRectangleOverlap([0, 0, 2, 2], [1, 1, 3, 3]) === true);
  console.log(isRectangleOverlap([0, 0, 1, 1], [1, 0, 2, 1]) === false);
  console.log(isRectangleOverlap([0, 0, 1, 1], [2, 2, 3, 3]) === false);
})();

function eq(a, b) {
  if (a === b) return true;
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    return a.every((v, i) => eq(v, b[i]));
  }
  return false;
}

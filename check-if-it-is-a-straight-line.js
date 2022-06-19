function checkStraightLine(pts) {
  // filter out duplicate points
  pts = pts.map(([x, y]) => `${x} ${y}`);
  pts = [...new Set(pts)];
  pts = pts.map((p) => p.split(" ").map((x) => parseInt(x)));
  if (pts.length <= 2) {
    return true;
  }
  const x0 = pts[0][0];
  const y0 = pts[0][1];
  const dx = pts[1][0] - pts[0][0];
  const dy = pts[1][1] - pts[0][1];
  for (let i = 2; i < pts.length; i++) {
    const [x, y] = pts[i];
    if ((x - x0) * dy !== (y - y0) * dx) {
      return false;
    }
  }
  return true;
}

(() => {
  console.log(
    checkStraightLine([
      [0, 0],
      [0, 1],
      [0, -1],
    ]) === true
  );
  console.log(
    checkStraightLine([
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
    ]) === true
  );
  console.log(
    checkStraightLine([
      [1, 2],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
    ]) === true
  );
  console.log(
    checkStraightLine([
      [1, 1],
      [2, 2],
      [3, 4],
      [4, 5],
      [5, 6],
      [7, 7],
    ]) === false
  );
  console.log(
    checkStraightLine([
      [1, 1],
      [2, 2],
      [2, 2],
      [3, 4],
      [4, 5],
      [5, 6],
      [7, 7],
    ]) === false
  );
})();

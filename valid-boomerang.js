function isBoomerang(points) {
  const dx0 = points[1][0] - points[0][0];
  const dy0 = points[1][1] - points[0][1];
  const dx1 = points[2][0] - points[0][0];
  const dy1 = points[2][1] - points[0][1];
  return dx0 * dy1 - dy0 * dx1 !== 0;
}

(() => {
  console.log(
    isBoomerang([
      [1, 1],
      [2, 3],
      [3, 2],
    ]) === true
  );
  console.log(
    isBoomerang([
      [1, 1],
      [2, 2],
      [3, 3],
    ]) === false
  );
})();

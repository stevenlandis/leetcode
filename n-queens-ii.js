function totalNQueens(n) {
  const v = Array(n).fill(false);
  const h = Array(n).fill(false);
  const d0 = Array(2 * n + 1).fill(false);
  const d1 = Array(2 * n + 1).fill(false);
  let count = 0;
  function helper(k, i) {
    if (k === 0) {
      count++;
      return;
    }
    if (i === n * n) {
      return;
    }
    // see if position i works
    const x = i % n;
    const y = Math.floor(i / n);
    const d0i = x + y;
    const d1i = x + (n - y - 1);
    if (!v[y] && !h[x] && !d0[d0i] && !d1[d1i]) {
      v[y] = true;
      h[x] = true;
      d0[d0i] = true;
      d1[d1i] = true;
      helper(k - 1, i + 1);
      v[y] = false;
      h[x] = false;
      d0[d0i] = false;
      d1[d1i] = false;
    }
    helper(k, i + 1);
  }
  helper(n, 0);
  return count;
}

(() => {
  console.log(totalNQueens(4) === 2);
  console.log(totalNQueens(1) === 1);
  console.log(totalNQueens(9));
})();

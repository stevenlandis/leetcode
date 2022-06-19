/*
Given a rows x cols binary matrix filled with 0s and 1s, find the largest rectangle containing only 1s and return its area.

Input
matrix = [
	['1','0','1','0','0'],
	['1','0','1','1','1'],
	['1','1','1','1','1'],
	['1','0','0','1','0'],
]
Output: 6
*/

function maximalRectangle(m) {
  m = m.map((row) => row.map((v) => (v === "0" ? 0 : 1)));
  let w = m[0].length;
  let h = m.length;
  let rc = Array(h)
    .fill(0)
    .map(() => Array(w).fill(0));
  for (let y = 0; y < h; y++) {
    for (let x = w - 1; x >= 0; x--) {
      let v = m[y][x];
      rc[y][x] = v === 0 ? 0 : x === w - 1 ? 1 : rc[y][x + 1] + 1;
    }
  }
  let maxArea = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let w = Infinity;
      for (let yi = y; yi < h && m[yi][x] === 1; yi++) {
        w = Math.min(w, rc[yi][x]);
        maxArea = Math.max(maxArea, w * (yi - y + 1));
      }
    }
  }
  return maxArea;
}

function naive(m) {
  let w = m[0].length;
  let h = m.length;
  let maxArea = 0;
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      for (let wi = 1; wi <= w - x; wi++) {
        for (let hi = 1; hi <= h - y; hi++) {
          let allOne = true;
          for (let xi = x; xi < x + wi; xi++) {
            for (let yi = y; yi < y + hi; yi++) {
              if (m[yi][xi] !== "1") {
                allOne = false;
              }
            }
          }
          if (allOne) {
            maxArea = Math.max(maxArea, wi * hi);
          }
        }
      }
    }
  }
  return maxArea;
}

(() => {
  let matrix = [
    ["1", "0", "1", "0", "0"],
    ["1", "0", "1", "1", "1"],
    ["1", "1", "1", "1", "1"],
    ["1", "0", "0", "1", "0"],
  ];
  ae(naive(matrix), 6);
  ae(maximalRectangle(matrix), 6);
  for (let i = 0; i < 1; i++) {
    // let w = ri(1, 10);
    // let h = ri(1, 10);
    let w = 200;
    let h = 200;
    let m = Array(h)
      .fill(0)
      .map(() =>
        Array(w)
          .fill(0)
          .map(() => ri(0, 1).toString())
      );
    // let e = naive(m);
    let t = maximalRectangle(m);
    let e = 5;
    console.log(e, t);
    if (!eq(e, t)) {
      console.log(`Expected ${e} but got ${t} for this matrix:`);
      for (const r of m) {
        console.log(r);
      }
      throw "Assertion Error";
    }
  }
})();

function ae(a, b) {
  if (!eq(a, b)) {
    console.log("A:", a);
    console.log("B:", b);
    throw "Assertion Error";
  }
}
const pr = console.log;
function ri(a, b) {
  return a + Math.floor((b - a + 1) * Math.random());
}
function eq(a, b) {
  if (a === b) return true;
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    return a.every((v, i) => eq(v, b[i]));
  }
  return false;
}

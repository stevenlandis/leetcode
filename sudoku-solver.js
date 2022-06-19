function solveSudoku(board) {
  const b = _solveSudoku(board);
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      board[r][c] = b[r][c];
    }
  }
}
function _solveSudoku(board) {
  function helper(b) {
    b = b.map((row) => row.map((x) => x));
    let unknowns = [];
    let retry = true;
    while (retry) {
      retry = false;
      unknowns = [];
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (b[r][c] >= 0) continue;
          const choices = new Set();
          for (let k = 0; k < 9; k++) {
            choices.add(k);
          }
          for (let i = 0; i < 9; i++) {
            choices.delete(b[r][i]);
            choices.delete(b[i][c]);
            choices.delete(
              b[3 * Math.floor(r / 3) + Math.floor(i / 3)][
                3 * Math.floor(c / 3) + (i % 3)
              ]
            );
          }
          if (choices.size === 0) {
            return [false, b];
          }
          if (choices.size === 1) {
            b[r][c] = choices.values().next().value;
            retry = true;
          } else {
            unknowns.push({ r, c, choices });
          }
        }
      }
    }
    if (unknowns.length === 0) return [true, b];
    unknowns.sort((a, b) => a.choices.size - b.choices.size);
    const { r, c, choices } = unknowns[0];
    const o = b[r][c];
    for (const choice of choices) {
      b[r][c] = choice;
      const [solved, tb] = helper(b);
      if (solved) {
        return [true, tb];
      }
    }
    b[r][c] = o;
    return [false, b];
  }
  const intBoard = board.map((row) =>
    row.map((v) => parseInt(v) - 1).map((v) => (isNaN(v) ? -1 : v))
  );
  const [solved, b] = helper(intBoard);
  if (!solved) {
    throw new Error("failed to solve");
  }
  return b.map((row) => row.map((v) => (1 + v).toString()));
}

function printBoard(b) {
  console.log(
    b
      .map((row) => row.map((v) => (v === -1 ? "." : v + 1)).join(" "))
      .join("\n") + "\n"
  );
}

function isSolved(board) {
  // check rows
  for (let r = 0; r < 9; r++) {
    const cnt = new Counter();
    for (let c = 0; c < 9; c++) {
      cnt.add(board[row][col]);
    }
    cnd.check();
  }
  // check columns
  for (let c = 0; c < 9; c++) {
    const cnt = new Counter();
    for (let r = 0; r < 9; r++) {
      cnt.add(board[row][col]);
    }
    cnt.check();
  }
  // check squares
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cnt = new Counter();
      for (let a = 0; a < 3; a++) {
        for (let b = 0; b < 3; b++) {
          const row = 3 * i + a;
          const col = 3 * j + b;
          cnt.add(board[row][col]);
        }
      }
      cnt.check();
    }
  }
}

class Counter {
  constructor() {
    this.c = {};
  }
  add(n) {
    if (!(n in this.c)) {
      this.c[n] = 0;
    }
    this.c[n]++;
  }
  check() {
    for (let i = 0; i < 9; i++) {
      ae(this.c[(i + 1).toString()], 1);
    }
  }
}

function check(board, sol) {
  board = board
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "")
    .map((line) => line.split(""));
  const test = solveSudoku(board);
  sol = sol
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "")
    .join("\n");
  ae(sol, test.map((row) => row.join("")).join("\n"));
}
(() => {
  check(
    `
    .....64..
    .9.45..2.
    5....7...
    .....5...
    9..18.7..
    .2......3
    8..94.1..
    ...6.....
    ..1....7.
  `,
    `
    312896457
    798453621
    546217398
    687325914
    953184762
    124769583
    875942136
    239671845
    461538279
  `
  );
  check(
    `
    7......2.
    ..89.37..
    .....1...
    .4......5
    ..38.72..
    ....6....
    ....1.9..
    ..6.2....
    .3.6.9.4.
  `,
    `
    719586423
    628943751
    354271896
    947132685
    563897214
    281465379
    475318962
    196724538
    832659147
  `
  );
  ae(
    solveSudoku([
      ["5", "3", ".", ".", "7", ".", ".", ".", "."],
      ["6", ".", ".", "1", "9", "5", ".", ".", "."],
      [".", "9", "8", ".", ".", ".", ".", "6", "."],
      ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
      ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
      ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
      [".", "6", ".", ".", ".", ".", "2", "8", "."],
      [".", ".", ".", "4", "1", "9", ".", ".", "5"],
      [".", ".", ".", ".", "8", ".", ".", "7", "9"],
    ]),
    [
      ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
      ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
      ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
      ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
      ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
      ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
      ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
      ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
      ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
    ]
  );
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

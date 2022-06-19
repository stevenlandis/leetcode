function numMovesStones(a, b, c) {
  const stones = [a, b, c];
  stones.sort((a, b) => a - b);
  return [getMinMoves(...stones), getMaxMoves(...stones)];
}
function getMinMoves(a, b, c) {
  if (a + 2 === c) {
    return 0;
  }
  if (a + 1 === b) {
    return 1 + getMinMoves(a, b, b + 1);
  }
  if (b + 1 === c) {
    return 1 + getMinMoves(b - 1, b, c);
  }
  if (b - a < c - b) {
    return 1 + getMinMoves(a, a + 1, b);
  } else {
    return 1 + getMinMoves(b, c - 1, c);
  }
}
function getMaxMoves(a, b, c) {
  if (a + 2 === c) {
    return 0;
  }
  if (a + 1 === b) {
    return 1 + getMaxMoves(a, b, c - 1);
  }
  if (b + 1 === c) {
    return 1 + getMaxMoves(a + 1, b, c);
  }
  return 1 + getMaxMoves(a + 1, b, c);
}

(() => {
  console.log(eq(numMovesStones(1, 2, 5), [1, 2]));
  console.log(eq(numMovesStones(4, 3, 2), [0, 0]));
  console.log(eq(numMovesStones(3, 5, 1), [1, 2]));
  console.log(eq(numMovesStones(1, 4, 6), [1, 3]));
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

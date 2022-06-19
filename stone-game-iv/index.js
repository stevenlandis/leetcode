function winnerSquareGame(n) {
  const cache = {};
  function helper(n, isAliceTurn) {
    const key = n;
    if (key in cache) {
      return !isAliceTurn ^ cache[key];
    }
    const aliceWins = [];
    for (let i = getBiggestSquare(n); i > 0; i--) {
      const sq = i * i;
      aliceWins.push(helper(n - sq, !isAliceTurn));
    }
    const result =
      aliceWins.length === 0
        ? !isAliceTurn
        : isAliceTurn
        ? any(aliceWins)
        : !anyNot(aliceWins);
    cache[key] = !isAliceTurn ^ result;
    return result;
  }
  const result = helper(n, true);
  return result;
}

function getBiggestSquare(n) {
  return Math.floor(Math.sqrt(n));
}

function any(l) {
  for (const x of l) {
    if (x) {
      return true;
    }
  }
  return false;
}

function anyNot(l) {
  for (const x of l) {
    if (!x) {
      return true;
    }
  }
  return false;
}

console.log(winnerSquareGame(1));
console.log(!winnerSquareGame(2));
console.log(winnerSquareGame(4));
console.log(!winnerSquareGame(7));
console.log(!winnerSquareGame(17));
console.time();
console.log(winnerSquareGame(1e5));
console.timeEnd();

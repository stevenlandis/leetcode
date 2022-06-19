function stoneGameV(values) {
  const partialSums = new Array(values.length + 1);
  partialSums[0] = values[0];
  for (let i = 0; i < values.length; i++) {
    partialSums[i + 1] = partialSums[i] + values[i];
  }
  function sum(start, len) {
    return partialSums[start + len] - partialSums[start];
  }
  function getScore(start, len, leftLen) {
    const rightStart = start + leftLen;
    const rightLen = len - leftLen;
    const leftSum = sum(start, leftLen);
    const rightSum = sum(rightStart, rightLen);

    const isLeft =
      leftSum < rightSum ||
      (leftSum === rightSum &&
        helper(start, leftLen) > helper(rightStart, rightLen));
    const score = isLeft
      ? leftSum + helper(start, leftLen)
      : rightSum + helper(rightStart, rightLen);
    // const leftScore = helper(start, leftLen);
    // const rightScore = helper(rightStart, rightLen);
    // const isLeft =
    //   leftSum < rightSum || (leftSum === rightSum && leftScore > rightScore);
    // const score = isLeft ? leftSum + leftScore : rightSum + rightScore;
    return score;
  }
  const cache = {};
  function helper(start, len) {
    if (len === 1) {
      return 0;
    }
    const key = `${start},${len}`;
    if (key in cache) {
      return cache[key];
    }
    // const total = sum(start, len);
    // let acc = values[start];
    // let leftLen = 1;
    // while (true) {
    //   acc += values[start + leftLen];
    //   if (2 * acc > total || leftLen + 2 === len) {
    //     break;
    //   }
    //   leftLen++;
    // }
    // const result = Math.max(
    //   getScore(start, len, leftLen),
    //   len === 2 ? 0 : getScore(start, len, leftLen + 1),
    //   leftLen < 2 ? 0 : getScore(start, len, leftLen - 1)
    // );
    // cache[key] = result;
    // return result;
    let bestScore;
    for (let leftLen = 1; leftLen < len; leftLen++) {
      const score = getScore(start, len, leftLen);
      if (bestScore === undefined || score > bestScore) {
        bestScore = score;
      }
    }
    cache[key] = bestScore;
    return bestScore;
  }
  // for (let len = 2; len <= values.length; len++) {
  //   // console.log("len", len);
  //   for (let start = 0; start <= values.length - len; start++) {
  //     helper(start, len);
  //   }
  // }
  return helper(0, values.length);
}

console.log(stoneGameV([6, 2, 3, 4, 5, 5]));
console.log(stoneGameV([7, 7, 7, 7, 7, 7, 7]));
console.log(stoneGameV([4]));
console.log(stoneGameV([98, 77, 24, 49, 6, 12, 2, 44, 51, 96]));
console.time();
console.log(
  stoneGameV(
    (() => {
      const l = new Array(500)
        .fill(undefined)
        .map(() => Math.floor(1e5 * Math.random()));
      return l;
    })()
  )
);
console.timeEnd();

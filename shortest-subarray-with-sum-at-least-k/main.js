function shortestSubarray(A, K) {
  const subSums = [0];
  for (let i = 0; i < A.length; i++) {
    subSums[i + 1] = subSums[i] + A[i];
  }
  // function getSubSum(start, end) {
  //   return subSums[end + 1] - subSums[start];
  // }

  let maxCache;
  let getMax;
  {
    const height = Math.ceil(Math.log2(subSums.length)) + 1;
    const size = 1 << height;
    maxCache = new Array(size).fill(-Infinity);
    const startOffset = size >> 1;
    for (let i = 0; i < subSums.length; i++) {
      maxCache[startOffset + i] = subSums[i];
    }
    for (let start = startOffset >> 1; start > 0; start = start >> 1) {
      for (let i = start; i < start << 1; i++) {
        maxCache[i] = Math.max(maxCache[i << 1], maxCache[(i << 1) + 1]);
      }
    }
    getMax = function (start, end) {
      const len = end - start + 1;
      if (len <= 0) return -Infinity;
      let startI = startOffset + start;
      let testLen = 1;
      while (testLen << 1 <= len && startI % 2 === 0) {
        testLen = testLen << 1;
        startI = startI >> 1;
      }
      return Math.max(maxCache[startI], getMax(start + testLen, end));
    };
  }

  function getFirstMaxGreaterThan(i, k) {
    let lo = i;
    let hi = subSums.length - 1;
    while (lo < subSums.length) {
      const mid = (lo + hi) >> 1;
      const v = getMax(i, mid);
      if (v < k) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
      if (lo === hi) {
        if (getMax(i, lo) < k) return -1;
        return lo;
      }
    }
    return -1;
  }

  let bestScore = Infinity;
  let bestI = -1;
  for (let i = 0; i + 1 < subSums.length; i++) {
    const testI = getFirstMaxGreaterThan(i + 1, subSums[i] + K);
    if (testI < 0) continue;
    const len = testI - i;
    if (len < bestScore) {
      bestScore = len;
      bestI = testI;
    }
  }
  return bestScore === Infinity ? -1 : bestScore;
}

console.log(shortestSubarray([1], 1) === 1);
console.log(shortestSubarray([1, 2], 4) === -1);
console.log(shortestSubarray([2, -1, 2], 3) === 3);
console.log(shortestSubarray([84, -37, 32, 40, 95], 167) === 3);
console.log(shortestSubarray([-28, 81, -20, 28, -29], 89) === 3);
console.log(shortestSubarray([1, 0, 1, 1], 2) === 2);
console.log(
  shortestSubarray(
    [
      -34,
      37,
      51,
      3,
      -12,
      -50,
      51,
      100,
      -47,
      99,
      34,
      14,
      -13,
      89,
      31,
      -14,
      -44,
      23,
      -38,
      6,
    ],
    151
  ) === 2
);

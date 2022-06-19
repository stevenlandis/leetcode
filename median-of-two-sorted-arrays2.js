function findMedianSortedArrays(a, b) {
  const len = a.length + b.length;
  const target = Math.floor((len - 1) / 2);
  if (len % 2 === 1) {
    return getMedianOfLists([a, b], target);
  } else {
    const lm = getMedianOfLists([a, b], target);
    const hm = getMedianOfLists([a, b], target + 1);
    return (lm + hm) / 2;
  }
}

function getMedianOfLists(ls, target) {
  for (const tl of ls) {
    const i = getMedian(tl, ls, target);
    if (i !== -1) return tl[i];
  }
  return Infinity;
}

function getMedian(l, ls, target) {
  function test(i) {
    const val = l[i];
    let mlo = 0;
    let mhi = 0;
    for (const tl of ls) {
      mlo += countMatches(tl, (x) => x < val);
      mhi += countMatches(tl, (x) => x <= val);
    }
    if (target < mlo) {
      return -1;
    } else if (target >= mhi) {
      return 1;
    } else {
      return 0;
    }
  }
  if (l.length === 0) return -1;
  let lo = 0;
  let hi = l.length - 1;
  if (test(lo) === 0) return lo;
  if (test(hi) === 0) return hi;
  let mid = 0;
  while (true) {
    mid = Math.floor((lo + hi) / 2);
    if (lo === mid) return -1;
    const v = test(mid);
    if (v < 0) {
      hi = mid;
    } else if (v > 0) {
      lo = mid;
    } else {
      return mid;
    }
  }
}

function countMatches(l, fcn) {
  if (l.length === 0) return 0;
  if (!fcn(l[0])) return 0;
  if (fcn(l[l.length - 1])) return l.length;
  let lo = 0;
  let hi = l.length - 1;
  while (true) {
    const mid = Math.floor((lo + hi) / 2);
    if (mid === lo) return lo + 1;
    const status = fcn(l[mid]);
    if (status) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
}

function brute(a, b) {
  const l = [...a, ...b];
  l.sort((a, b) => a - b);
  const i = Math.floor((l.length - 1) / 2);
  return l.length % 2 === 1 ? l[i] : (l[i] + l[i + 1]) / 2;
}

(() => {
  ae(
    countMatches([1, 2, 3, 4, 5, 6, 7, 8], (x) => x < 5),
    4
  );
  ae(
    countMatches([], (x) => x < 5),
    0
  );
  ae(
    countMatches([1, 2, 3], (x) => x < 5),
    3
  );
  ae(
    countMatches([5, 6, 7, 8], (x) => x < 5),
    0
  );
  ae(brute([1, 3], [2]), 2);
  ae(brute([1, 2], [3, 4]), 2.5);
  ae(brute([0, 0], [0, 0]), 0);
  ae(brute([], [1]), 1);
  ae(brute([2], []), 2);
  ae(brute([3], [5]), 4);
  ae(brute([1, 2, 3], [4, 5]), 3);

  ae(findMedianSortedArrays([14, 20], [15, 16]), 15.5);
  ae(findMedianSortedArrays([1, 3, 5, 7], [2, 4, 6]), 4);
  ae(
    findMedianSortedArrays([3, 6, 12, 18, 19], [0, 1, 3, 6, 7, 7, 9, 17, 18]),
    7
  );

  for (let i = 0; i < 1000; i++) {
    const a = Array(ri(2, 10))
      .fill(0)
      .map(() => ri(0, 20));
    a.sort((aa, bb) => aa - bb);
    const b = Array(ri(2, 10))
      .fill(0)
      .map(() => ri(0, 20));
    b.sort((aa, bb) => aa - bb);
    const t = findMedianSortedArrays(a, b);
    const e = brute(a, b);
    if (!eq(t, e)) {
      console.log("for input:", a.length + b.length);
      console.log(JSON.stringify(a));
      console.log(JSON.stringify(b));
      console.log(`got ${JSON.stringify(t)}, expected ${JSON.stringify(e)}`);
      return;
    }
    console.log(a, b, t, e);
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

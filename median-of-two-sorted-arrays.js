function findMedianSortedArrays(a, b) {
  return [];
}
function findMedianSortedArrays2(a, b) {
  console.log("starting");
  // console.log(a, b);
  const L = a.length + b.length;
  const sol = binarySearch(
    (x) => (x[0] + x[1]) * 2 > L,
    (lo, hi) => {
      const da = hi[0] - lo[0];
      const db = hi[1] - lo[1];
      if (da > db) {
        const ia = Math.round((hi[0] + lo[0]) / 2);
        const va = a[ia];
        const ib = binarySearch(
          (i) => b[i] > va,
          (x, y) => Math.round((x + y) / 2),
          (x, y) => x === y,
          lo[1],
          hi[1]
        );
        return [ia, ib];
      } else {
        const ib = Math.round((hi[1] + lo[1]) / 2);
        const vb = b[ib];
        const ia = binarySearch(
          (i) => a[i] > vb,
          (x, y) => Math.round((x + y) / 2),
          (x, y) => x === y,
          lo[0],
          hi[0]
        );
        return [ia, ib];
      }
    },
    (x, y) => x[0] === y[0] && x[1] === y[1],
    [0, 0],
    [a.length - 1, b.length - 1]
  );
  console.log("sol:", sol);
  let av = a[sol[0]];
  let bv = b[sol[1]];
  if (av === bv) {
    ae(av, brute(a, b));
    return av;
  } else if (av < bv) {
    if (L % 2 === 1 && 2 * (sol[0] + sol[1] + 1) + 1 === L) {
      ae(bv, brute(a, b));
      return bv;
    }
  } else {
    if (L % 2 === 1 && 2 * (sol[0] + sol[1] + 1) + 1 === L) {
      ae(av, brute(a, b));
      return av;
    }
  }
  // if (L % 2 === 1) {
  //   // return sol[0] < sol[1] ? b[sol[1]] : a[sol[0]];
  //   return Math.max(a[sol[0]], b[sol[1]]);
  // }
  // console.log("sol", sol, sol[0] + sol[1], L);
  return sol;
  return [a[sol[0]], b[sol[1]]];
}

function binarySearch(compFcn, getMid, equals, startLo, startHi) {
  if (equals(startLo, startHi)) return startLo;
  if (compFcn(startLo)) return startLo;
  if (!compFcn(startHi)) return startHi;
  let lo = startLo;
  let hi = startHi;
  while (true) {
    const mid = getMid(lo, hi);
    const status = compFcn(mid);
    // console.log(lo, mid, hi, status);
    if (status) {
      if (equals(hi, mid)) {
        return lo;
      }
      hi = mid;
    } else {
      if (equals(lo, mid)) {
        return lo;
      }
      lo = mid;
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
  ae(brute([1, 3], [2]), 2);
  ae(brute([1, 2], [3, 4]), 2.5);
  ae(brute([0, 0], [0, 0]), 0);
  ae(brute([], [1]), 1);
  ae(brute([2], []), 2);
  ae(brute([3], [5]), 4);
  ae(brute([1, 2, 3], [4, 5]), 3);

  // ae(findMedianSortedArrays([1, 3, 5, 7], [2, 4, 6]), 4);
  // ae(
  //   findMedianSortedArrays([3, 6, 12, 18, 19], [0, 1, 3, 6, 7, 7, 9, 17, 18]),
  //   7
  // );
  // return;

  for (let i = 0; i < 1000; i++) {
    const a = Array(ri(5, 10))
      .fill(0)
      .map(() => ri(0, 20));
    a.sort((aa, bb) => aa - bb);
    const b = Array(ri(5, 10))
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

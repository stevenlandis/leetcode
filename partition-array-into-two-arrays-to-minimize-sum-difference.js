function minimumDifference(nums) {
  let minDif = Infinity;
  for (let i = 0; i < 1 << nums.length; i++) {
    let sa = 0;
    let ca = 0;
    let sb = 0;
    let cb = 0;
    for (let j = 0; j < nums.length; j++) {
      if (i & (1 << j)) {
        sa += nums[j];
        ca++;
      } else {
        sb += nums[j];
        cb++;
      }
    }
    if (ca === 0 || cb === 0) {
      continue;
    }
    minDif = Math.min(minDif, Math.abs(sa - sb));
  }
  return minDif;
}

function brute(nums) {
  let minDif = Infinity;
  for (let i = 0; i < 1 << nums.length; i++) {
    let pa = [];
    let pb = [];
    for (let j = 0; j < nums.length; j++) {
      if (i & (1 << j)) {
        pa.push(nums[j]);
      } else {
        pb.push(nums[j]);
      }
    }
    if (pa.length === 0 || pb.length === 0) {
      continue;
    }
    let sa = pa.reduce((a, b) => a + b);
    let sb = pb.reduce((a, b) => a + b);
    minDif = Math.min(minDif, Math.abs(sa - sb));
  }
  return minDif;
}

(() => {
  ae(brute([3, 9, 7, 3]), 2);
  ae(brute([-36, 36]), 72);
  ae(brute([2, -1, 0, 4, -2, -9]), 0);
  ae(minimumDifference([3, 9, 7, 3]), 2);
  ae(minimumDifference([-36, 36]), 72);
  ae(minimumDifference([2, -1, 0, 4, -2, -9]), 0);

  ae(
    minimumDifference(
      Array(24)
        .fill(0)
        .map(() => ri(-100, 100))
    ),
    0
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

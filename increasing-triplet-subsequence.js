function increasingTriplet(nums) {
  let s0 = undefined;
  let s1 = undefined;
  for (const x of nums) {
    if (s1 !== undefined && x > s1) {
      return true;
    }
    if (s0 !== undefined && x > s0 && (s1 === undefined || x < s1)) {
      s1 = x;
    }
    if (s0 === undefined || x < s0) {
      s0 = x;
    }
  }
  return false;
}

function brute(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[i] < nums[j] && nums[j] < nums[k]) {
          return true;
        }
      }
    }
  }
  return false;
}

(() => {
  ae(increasingTriplet([1, 3, 0, 4, 2]), true);

  ae(brute([1, 2, 3, 4, 5]), true);
  ae(brute([5, 4, 3, 2, 1]), false);
  ae(brute([2, 1, 5, 0, 4, 6]), true);

  for (let i = 0; i < 1000; i++) {
    const nums = new Array(ri(0, 1000)).fill(0).map(() => ri(-100, 100));
    const t = increasingTriplet(nums);
    const e = brute(nums);
    if (t !== e) {
      console.log("for", nums);
      console.log(`got ${t}, expected ${e}`);
      break;
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

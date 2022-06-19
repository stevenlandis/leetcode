function lengthOfLIS(nums) {
  return 0;
}

function brute(nums) {
  return 0;
}

(() => {
  ae(brute([]), 0);

  for (let i = 0; i < 10; i++) {
    const nums = Array(ri(0, 20))
      .fill(0)
      .map(() => ri(0, 100));
    const t = lengthOfLIS(nums);
    const e = brute(nums);
    if (!eq(t, e)) {
      console.log("for input", nums);
      console.log(`got ${t}, expected ${e}`);
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

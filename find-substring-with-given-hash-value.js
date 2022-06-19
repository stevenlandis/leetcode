function subStrHash(s, power, modulo, k, hashValue) {
  return brute(s, power, modulo, k, hashValue);
}
function hash(s, ps, m) {
  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    sum = (sum + s[i] * ps[i]) % m;
  }
  return sum;
}

function brute(s, power, modulo, k, hashValue) {
  s = [...s].map((x) => x.charCodeAt(0) - "a".charCodeAt(0) + 1);
  const ps = [1];
  for (let i = 1; i < k; i++) {
    ps.push((ps[ps.length - 1] * power) % modulo);
  }
  for (let i = 0; i <= s.length - k; i++) {
    const ss = s.slice(i, i + k);
    const h = hash(ss, ps, modulo);
    if (h === hashValue) {
      return ss
        .map((x) => String.fromCharCode(x - 1 + "a".charCodeAt(0)))
        .join("");
    }
  }
}

(() => {
  ae(brute("leetcode", 7, 20, 2, 0), "ee");
  ae(brute("fbxzaad", 31, 100, 3, 32), "fbx");
  {
    const s = Array(2e4)
      .fill(0)
      .map(() => String.fromCharCode(ri(0, 26) + "a".charCodeAt(0)))
      .join("");
    ae(brute(s, 31, 100, 1000, 101), undefined);
  }
  return;

  for (let i = 0; i < 1; i++) {
    const s = Array(2e4)
      .fill(0)
      .map(() => String.fromCharCode(ri(0, 26) + "a".charCodeAt(0)))
      .join("");
    const t = subStrHash(nums);
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

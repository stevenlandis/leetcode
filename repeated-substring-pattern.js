function repeatedSubstringPattern(s) {
  for (let len = 1; len <= Math.floor(s.length / 2); len++) {
    if (s.length % len !== 0) continue;
    console.log(len);
    if (s === s.substr(0, len).repeat(s.length / len)) {
      return true;
    }
  }
  return false;
}

(() => {
  console.log(repeatedSubstringPattern("abab") === true);
  console.log(repeatedSubstringPattern("aba") === false);
  console.log(repeatedSubstringPattern("abcabcabcabc") === true);
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

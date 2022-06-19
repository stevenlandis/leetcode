function vectorize(word) {
  const s = new Set();
  for (const c of word) {
    const i = c.charCodeAt(0) - 97;
    s.add(i);
  }
  let n = 0;
  for (const i of s) {
    n += 1 << i;
  }
  return n;
}
function maxProduct(words) {
  words = words.map((word) => [vectorize(word), word.length]);
  let max = 0;
  for (let i = 0; i < words.length; i++) {
    const [wi, li] = words[i];
    for (let j = i + 1; j < words.length; j++) {
      const [wj, lj] = words[j];
      if ((wi & wj) === 0) {
        max = Math.max(max, li * lj);
      }
    }
  }
  return max;
}

(() => {
  console.log(
    maxProduct(["abcw", "baz", "foo", "bar", "xtfn", "abcdef"]) === 16
  );
  console.log(maxProduct(["a", "ab", "abc", "d", "cd", "bcd", "abcd"]) === 4);
  console.log(maxProduct(["a", "aa", "aaa", "aaaa"]) === 0);
})();

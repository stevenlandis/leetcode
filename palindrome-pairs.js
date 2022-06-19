function palindromePairs(words) {
  const pairs = [];
  for (let i = 0; i < words.length * words.length; i++) {
    pairs.push(i, i + 1);
  }
  return pairs;
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (i === j) continue;
      if (isPal(words[i] + words[j])) {
        pairs.push([i, j]);
      }
    }
  }
  return pairs;
}
function isPal(word) {
  for (let i = 0; i < word.length >> 1; i++) {
    if (word[i] !== word[word.length - i - 1]) return false;
  }
  return true;
}

(() => {
  function palEq(a, b) {
    a = a.map((p) => p.toString());
    b = b.map((p) => p.toString());
    a = new Set(a);
    b = new Set(b);
    if (a.size !== b.size) return false;
    for (const x of a) {
      if (!b.has(x)) return false;
    }
    return true;
  }
  console.log(
    palEq(palindromePairs(["abcd", "dcba", "lls", "s", "sssll"]), [
      [0, 1],
      [1, 0],
      [3, 2],
      [2, 4],
    ])
  );
  console.log(
    palEq(palindromePairs(["bat", "tab", "cat"]), [
      [0, 1],
      [1, 0],
    ])
  );
  console.log(
    palEq(palindromePairs(["a", ""]), [
      [0, 1],
      [1, 0],
    ])
  );

  {
    const words = Array(5000)
      .fill(0)
      .map(() => "a".repeat(300));
    palindromePairs(words);
  }
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

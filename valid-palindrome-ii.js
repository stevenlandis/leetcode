function validPalindrome(s) {
  for (let i = 0; i < s.length >> 1; i++) {
    if (s[i] !== s[s.length - i - 1]) {
      return isPal(s, i) || isPal(s, s.length - i - 1);
    }
  }
  return true;
}
function isPal(s, skip) {
  let i = 0;
  let j = s.length - 1;
  while (true) {
    if (i === skip) i++;
    if (j === skip) j--;
    if (i >= j) break;
    if (s[i] !== s[j]) return false;
    i++;
    j--;
  }
  return true;
}

(() => {
  console.log(validPalindrome("aba") === true);
  console.log(validPalindrome("abca") === true);
  console.log(validPalindrome("abc") === false);
  console.log(
    validPalindrome(
      Array(100000)
        .fill(0)
        .map(() => ["a", "b", "c"][Math.floor(3 * Math.random())])
    ) === false
  );
})();

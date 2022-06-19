function checkZeroOnes(s) {
  if (s.length === 0) {
    return false;
  }
  let maxZero = 0;
  let maxOne = 0;
  let c = s[0];
  let streak = 1;
  let i = 1;
  while (true) {
    if (c === "0") {
      maxZero = Math.max(maxZero, streak);
    } else {
      maxOne = Math.max(maxOne, streak);
    }
    if (i >= s.length) break;
    const ci = s[i];
    if (c === ci) {
      streak++;
    } else {
      streak = 1;
      c = ci;
    }
    i++;
  }
  return maxOne > maxZero;
}

(() => {
  console.log(checkZeroOnes("1101") === true);
  console.log(checkZeroOnes("111000") === false);
  console.log(checkZeroOnes("110100010") === false);
})();

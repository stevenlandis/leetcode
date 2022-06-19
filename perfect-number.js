function checkPerfectNumber(n) {
  let s = 0;
  for (let d = 1; d < n; d++) {
    if (n % d === 0) {
      s += d;
    }
  }
  return n === s;
}

(() => {
  console.log(checkPerfectNumber(28) === true);
  console.log(checkPerfectNumber(29) === false);
  console.log(checkPerfectNumber(6) === true);
  console.log(checkPerfectNumber(496) === true);
  console.log(checkPerfectNumber(8128) === true);
  console.log(checkPerfectNumber(2) === false);
})();

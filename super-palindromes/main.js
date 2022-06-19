function superpalindromesInRange(left, right) {
  left = BigInt(left);
  right = BigInt(right);
  let allSupers = getAllSupers();
  allSupers = allSupers.filter((n) => left <= n && n <= right);
  return allSupers.length;
}

function isPal(s) {
  s = s.toString();
  for (let i = 0; i < s.length >> 1; i++) {
    if (s[i] !== s[s.length - i - 1]) return false;
  }
  return true;
}
function getSupers(digits) {
  if (digits === 1) {
    return [1n, 2n, 3n];
  }
  let b = BigInt(3n ** BigInt(Math.ceil(digits / 2) - 1));
  const max = 3n * b;
  const res = [];
  while (b < max) {
    const bs = b.toString(3);
    const n = BigInt(
      bs +
        bs
          .substr(0, bs.length - (digits % 2))
          .split("")
          .reverse()
          .join("")
    );
    if (isPal(n) && isPal(n * n)) {
      res.push(n);
    }
    b++;
  }
  return res;
}
function getAllSupers() {
  const res = [];
  for (let i = 1; i <= 10; i++) {
    const temp = getSupers(i);
    for (const n of temp) {
      res.push(n * n);
    }
  }
  return res;
}

function brute(left, right) {
  left = BigInt(left);
  right = BigInt(right);
  let count = 0;
  let n = 1n;
  while (true) {
    const n2 = n * n;
    if (n2 > right) break;
    if (n2 >= left && isPal(n) && isPal(n2)) {
      count++;
    }
    n++;
  }
  return count;
}

(() => {
  console.assert(brute("4", "1000") === 4);
  console.assert(brute("1", "1000") === 5);
  console.assert(brute("1", "483") === 4);
  console.assert(brute("1", "484") === 5);

  for (let i = 0; i < 10000; i++) {
    const a = Math.floor(100 * Math.random());
    const b = Math.floor(100 * Math.random());
    const left = Math.min(a, b).toString();
    const right = Math.max(a, b).toString();
    const test = superpalindromesInRange(left, right);
    const correct = superpalindromesInRange(left, right);
    if (test !== correct) {
      console.log(
        `left: ${left}, right: ${right}, got: ${test}, expected: ${correct}`
      );
      break;
    }
  }
  // console.log(getSupers(18));
  // console.log(getAllSupers());
  // for (let i = 0n; i < 10000000000n; i++) {
  //   const i2 = i * i;
  //   if (isPal(i.toString()) && isPal(i2.toString())) {
  //     console.log(i, i2);
  //   }
  // }
})();

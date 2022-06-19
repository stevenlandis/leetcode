function hasGroupsSizeX(deck) {
  const m = {};
  for (const x of deck) {
    if (!(x in m)) {
      m[x] = 0;
    }
    m[x]++;
  }
  const sizes = Object.values(m);
  const G = sizes.reduce(gcd);
  return G !== 1;
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  if (a === 0) return b;
  if (b === 0) return a;
  if (b > a) {
    const temp = a;
    a = b;
    b = temp;
  }
  while (true) {
    a %= b;
    if (a === 0) return b;
    b %= a;
    if (b === 0) return a;
  }
}

(() => {
  console.log(hasGroupsSizeX([1, 2, 3, 4, 4, 3, 2, 1]) === true);
  console.log(hasGroupsSizeX([1, 1, 1, 2, 2, 2, 3, 3]) === false);
  console.log(hasGroupsSizeX([1]) === false);
  console.log(hasGroupsSizeX([1, 1]) === true);
})();

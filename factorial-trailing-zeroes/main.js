function base(n) {
  let f = 1n;
  for (let i = 1; i <= n; i++) {
    f *= BigInt(i);
  }
  f = f.toString();
  let c = 0;
  while (c < f.length && f[f.length - c - 1] === "0") {
    c++;
  }
  return c;
}

function trailingZeroes(n) {
  let c = 0;
  while (n > 0) {
    n = Math.floor(n / 5);
    c += n;
  }
  return c;
}

function test(impl) {
  console.log(impl(1) === 0);
  console.log(impl(4) === 0);
  console.log(impl(5) === 1);
  console.log(impl(10) === 2);
}

for (let i = 0; i <= 50; i++) {
  console.log(i, Math.floor(i / 5), base(i), trailingZeroes(i));
}

function nearestPalindromic(n) {
  if (n.length === 1) {
    return (parseInt(n) - 1).toString();
  }
  const lo = getLo((BigInt(n) - 1n).toString());
  const hi = getHi((BigInt(n) + 1n).toString());
  const loDif = BigInt(n) - BigInt(lo);
  const hiDif = BigInt(hi) - BigInt(n);
  return loDif === hiDif ? lo : loDif < hiDif ? lo : hi;
}
function getLo(n) {
  n = BigInt(n).toString();
  let left = n.slice(0, Math.floor(n.length / 2));
  const right = n.slice(Math.ceil(n.length / 2));
  const center = n.length % 2 === 0 ? "" : n[Math.floor(n.length / 2)];
  const leftFlip = [...left].reverse().join("");
  if (leftFlip === right) {
    return n;
  }
  if (leftFlip < right) {
    return left + center + leftFlip;
  }
  return getLo(
    (BigInt(left + center) - 1n).toString() + "9".repeat(right.length)
  );
}
function getHi(n) {
  n = BigInt(n).toString();
  let left = n.slice(0, Math.floor(n.length / 2));
  const right = n.slice(Math.ceil(n.length / 2));
  const center = n.length % 2 === 0 ? "" : n[Math.floor(n.length / 2)];
  const leftFlip = [...left].reverse().join("");
  if (leftFlip === right) {
    return n;
  }
  if (leftFlip > right) {
    return left + center + leftFlip;
  }
  return getHi(
    (BigInt(left + center) + 1n).toString() + "0".repeat(right.length)
  );
}

console.log(nearestPalindromic("123") === "121");
console.log(nearestPalindromic("1") === "0");
console.log(getLo("4555") === "4554");
console.log(getLo("4553") === "4444");
console.log(getHi("4553") === "4554");
console.log(getHi("4555") === "4664");
console.log(getLo("45155") === "45154");
console.log(getLo("45153") === "45054");
console.log(getHi("45153") === "45154");
console.log(getHi("45155") === "45254");
console.log(nearestPalindromic("11") === "9");
console.log(nearestPalindromic("10001") === "9999");

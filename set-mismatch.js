function findErrorNums(nums) {
  const s = new Set();
  for (let i = 1; i <= nums.length; i++) {
    s.add(i);
  }
  let a, b;
  for (const x of nums) {
    if (!s.has(x)) {
      a = x;
    }
    s.delete(x);
  }
  [b] = [...s];
  return [a, b];
}

(() => {
  console.log(eq(findErrorNums([1, 2, 2, 4]), [2, 3]));
  console.log(eq(findErrorNums([1, 1]), [1, 2]));
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

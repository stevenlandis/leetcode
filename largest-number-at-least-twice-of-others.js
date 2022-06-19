function dominantIndex(nums) {
  let max = nums[0];
  let maxI = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i];
      maxI = i;
    }
  }
  let less = true;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== max && nums[i] * 2 > max) {
      less = false;
      break;
    }
  }
  return less ? maxI : -1;
}

(() => {
  console.log(dominantIndex([3, 6, 1, 0]) === 1);
  console.log(dominantIndex([1, 2, 3, 4]) === -1);
  console.log(dominantIndex([1]) === 0);
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

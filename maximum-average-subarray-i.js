function findMaxAverage(nums, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) {
    sum += nums[i];
  }
  let max = sum;
  for (let i = 0; i < nums.length - k; i++) {
    sum -= nums[i];
    sum += nums[i + k];
    max = Math.max(max, sum);
  }
  return max / k;
}

(() => {
  console.log(eq(findMaxAverage([1, 12, -5, -6, 50, 3], 4), 12.75));
  console.log(eq(findMaxAverage([5], 1), 5));
})();

function eq(a, b) {
  return Math.abs(a - b) < 1e-5;
}

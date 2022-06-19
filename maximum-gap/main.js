function maximumGap(nums) {
  nums.sort((a, b) => a - b);
  if (nums.length < 2) {
    return 0;
  }
  let max = nums[1] - nums[0];
  for (let i = 1; i + 1 < nums.length; i++) {
    max = Math.max(max, nums[i + 1] - nums[i]);
  }
  return max;
}

(() => {
  console.log(maximumGap([]) === 0);
  console.log(maximumGap([1]) === 0);
  console.log(maximumGap([1, 5]) === 4);
  console.log(maximumGap([3, 6, 9, 1]) === 3);
})();

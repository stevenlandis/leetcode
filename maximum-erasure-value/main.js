function maximumUniqueSubarray(nums) {
  let bestSum = 0;

  const set = new Set();
  let i = 0;
  let j = 0;
  let sum = 0;
  while (true) {
    if (sum > bestSum) {
      bestSum = sum;
    }
    if (i >= nums.length || j >= nums.length) break;
    const nj = nums[j];
    if (set.has(nj)) {
      while (true) {
        const ni = nums[i];
        set.delete(ni);
        sum -= ni;
        i++;
        if (ni === nj) break;
      }
    }
    set.add(nj);
    sum += nj;
    j++;
  }
  return bestSum;
}

function brute(nums) {
  function areUnique(l) {
    const set = new Set();
    for (const x of l) {
      if (set.has(x)) return false;
      set.add(x);
    }
    return true;
  }
  let bestSum = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      const l = [];
      for (let k = i; k <= j; k++) {
        l.push(nums[k]);
      }
      // console.log(l);
      if (areUnique(l)) {
        const sum = l.reduce((a, b) => a + b);
        if (sum > bestSum) {
          bestSum = sum;
        }
      }
    }
  }
  return bestSum;
}

(() => {
  console.log(maximumUniqueSubarray([4, 2, 4, 5, 6]) === 17);
  console.log(maximumUniqueSubarray([5, 2, 1, 2, 5, 2, 1, 2, 5]) === 8);
  console.log(brute([4, 2, 4, 5, 6]) === 17);
  console.log(brute([5, 2, 1, 2, 5, 2, 1, 2, 5]) === 8);

  for (let i = 0; i < 100000; i++) {
    const nums = Array(Math.floor(10 * Math.random()))
      .fill(0)
      .map(() => Math.floor(10 * Math.random()));
    const test = maximumUniqueSubarray(nums);
    const expect = brute(nums);
    if (test !== expect) {
      console.log(`for nums=${nums}`);
      console.log(`got ${test}, expected ${expect}`);
    }
  }
})();

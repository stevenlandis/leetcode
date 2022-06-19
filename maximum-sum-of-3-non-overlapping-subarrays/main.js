function maxSumOfThreeSubarrays(nums, k) {
  const sums = Array(nums.length + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    sums[i + 1] = sums[i] + nums[i];
  }
  const size = nums.length - 3 * k + 1;
  const baseNode = { val: 0, next: null };
  let l0 = Array(size).fill(baseNode);
  for (let j = 0; j < 3; j++) {
    const l1 = Array(size);
    for (let i = 0; i < size; i++) {
      const idx = j * k + i;
      const agg = sums[idx + k] - sums[idx];
      const newNode = { val: l0[i].val + agg, next: l0[i], i: idx };
      l1[i] = newNode;
    }
    // console.log(l1);
    for (let i = 1; i < size; i++) {
      if (l1[i - 1].val >= l1[i].val) {
        l1[i] = l1[i - 1];
      }
    }
    l0 = l1;
  }
  const res = [];
  for (let node = l0[l0.length - 1]; node.next !== null; node = node.next) {
    res.push(node.i);
  }
  res.reverse();
  return res;
}

function bruteForce(nums, k) {
  let best = 0;
  let idx = [];
  for (let a = 0; a + k - 1 < nums.length; a++) {
    let aSum = 0;
    for (let i = a; i < a + k; i++) {
      aSum += nums[i];
    }
    for (let b = a + k; b + k - 1 < nums.length; b++) {
      let bSum = 0;
      for (let i = b; i < b + k; i++) {
        bSum += nums[i];
      }
      for (let c = b + k; c + k - 1 < nums.length; c++) {
        let cSum = 0;
        for (let i = c; i < c + k; i++) {
          cSum += nums[i];
        }
        const sum = aSum + bSum + cSum;
        if (sum > best) {
          best = sum;
          idx = [a, b, c];
        }
      }
    }
  }
  return idx;
  // return best;
}

(() => {
  function arrayEq(a, b) {
    return a.length === b.length && a.every((v, i) => v === b[i]);
  }
  console.assert(arrayEq(bruteForce([1, 2, 1, 2, 6, 7, 5, 1], 2), [0, 3, 5]));
  console.assert(
    arrayEq(bruteForce([1, 2, 1, 2, 1, 2, 1, 2, 1], 2), [0, 2, 4])
  );

  for (let i = 0; i < 10000; i++) {
    const len = 3 + Math.floor(100 * Math.random());
    const k = 1 + Math.floor(Math.floor(len / 3) * Math.random());
    const nums = Array(len)
      .fill(0)
      .map(() => Math.floor(20 * Math.random()));
    const test = maxSumOfThreeSubarrays(nums, k);
    const correct = bruteForce(nums, k);
    if (!arrayEq(test, correct)) {
      // if (test !== correct) {
      console.log(`failed with k: ${k}, nums: [${nums}]`);
      console.log(`got ${test}`);
      console.log(`expected ${correct}`);
      break;
    }
  }

  console.log(
    arrayEq(maxSumOfThreeSubarrays([1, 2, 1, 2, 6, 7, 5, 1], 2), [0, 3, 5])
  );
  console.log(
    arrayEq(maxSumOfThreeSubarrays([1, 2, 1, 2, 1, 2, 1, 2, 1], 2), [0, 2, 4])
  );
  console.log(arrayEq(maxSumOfThreeSubarrays([2, 5, 18, 4, 7], 1), [1, 2, 4]));
  console.log(
    arrayEq(maxSumOfThreeSubarrays([10, 0, 0, 18, 3, 18], 2), [0, 2, 4])
  );
  console.log(arrayEq(maxSumOfThreeSubarrays([0, 0, 12], 1), [0, 1, 2]));
})();

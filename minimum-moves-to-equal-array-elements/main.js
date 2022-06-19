function minMoves(nums) {
  let moves = 0;
  while (true) {
    let allEqual = true;
    for (let i = 1; i < nums.length; i++) {
      if (nums[0] !== nums[i]) {
        allEqual = false;
        break;
      }
    }
    if (allEqual) {
      break;
    }
    let min = nums[0];
    let max = nums[0];
    let maxI = 0;
    for (let i = 1; i < nums.length; i++) {
      const v = nums[i];
      if (v > max) {
        max = v;
        maxI = i;
      }
      if (v < min) {
        min = v;
      }
    }
    const steps = max - min;
    for (let i = 0; i < nums.length; i++) {
      if (i === maxI) continue;
      nums[i] += steps;
    }
    moves += steps;
  }
  return moves;
}

function brute(nums) {
  let moves = 0;
  while (true) {
    let allEqual = true;
    for (let i = 1; i < nums.length; i++) {
      if (nums[0] !== nums[i]) {
        allEqual = false;
        break;
      }
    }
    if (allEqual) {
      break;
    }
    let max = nums[0];
    let maxI = 0;
    for (let i = 1; i < nums.length; i++) {
      const v = nums[i];
      if (v > max) {
        max = v;
        maxI = i;
      }
    }
    for (let i = 0; i < nums.length; i++) {
      if (i === maxI) continue;
      nums[i]++;
    }
    moves++;
  }
  return moves;
}

(() => {
  console.assert(brute([1, 2, 3]) === 3);
  console.assert(brute([1, 1, 1]) === 0);

  for (let i = 0; i < 100; i++) {
    const nums = Array(1 + Math.floor(10 * Math.random()))
      .fill(0)
      .map(() => Math.floor(10 * (2 * Math.random() - 1)));
    const test = minMoves([...nums]);
    const correct = brute([...nums]);
    if (test !== correct) {
      console.log(`For nums: [${nums}]`);
      console.log(`got ${test}, expected ${correct}`);
      break;
    }
  }
})();

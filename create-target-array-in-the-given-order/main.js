function createTargetArray(nums, index) {
  const h = getHeight(nums.length);
  const size = (1 << h) - 1;
  const baseOffset = (1 << (h - 1)) - 1;
  let counts = Array(size).fill(0);
  for (const i of index) {
    counts[baseOffset + i]++;
  }
  {
    for (let span = 1 << (h - 2); span > 0; span = span >> 1) {
      const start = span - 1;
      for (let i = start; i < start + span; i++) {
        counts[i] = counts[(i << 1) + 1] + counts[(i << 1) + 2];
      }
    }
  }
  const res = Array(nums.length);
  for (let i = 0; i < nums.length; i++) {
    const idx = index[i];
    const num = nums[i];
    let count = 0;
    {
      let largeSize = 1;
      let startI = baseOffset;
      let size = idx + 1;
      while (true) {
        const nextSize = largeSize << 1;
        if (nextSize > size) {
          break;
        }
        largeSize = nextSize;
        startI = (startI - 1) >> 1;
      }
      while (true) {
        console.log(size, largeSize, count, startI);
        if (largeSize <= size) {
          count += counts[startI];
          size -= largeSize;
          if (size === 0) {
            break;
          }
          startI++;
        }
        largeSize = largeSize >> 1;
        startI = (startI << 1) + 1;
      }
    }
    console.log("idx:", idx, "count:", count);
    res[idx + count - 1] = num;
    let ri = baseOffset + idx;
    while (true) {
      counts[ri]--;
      if (ri === 0) {
        break;
      }
      ri = (ri - 1) >> 1;
    }
  }
  return res;
}

function getHeight(N) {
  let h = 1;
  let x = 1;
  while (x < N) {
    h++;
    x = x << 1;
  }
  return h;
}

// console.log(createTargetArray([0, 1, 2, 3, 4], [0, 1, 2, 2, 1]));
// console.log(createTargetArray([1, 2, 3, 4, 0], [0, 1, 2, 3, 0]));
console.log(createTargetArray([4, 2, 4, 3, 2], [0, 0, 1, 3, 1]));

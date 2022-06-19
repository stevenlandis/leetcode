function largestNumber(costs, target) {
  const l = Array(target + 1).fill(-1);
  l[0] = 0;
  for (let i = 0; i < l.length; i++) {
    const l0 = l[i];
    if (l0 === -1) continue;
    for (let j = 0; j < costs.length; j++) {
      const cost = i + costs[j];
      if (cost < l.length) {
        l[cost] = Math.max(l[cost], l0 + 1);
      }
    }
  }
  if (l[target] === -1) {
    return "0";
  }
  const res = [];
  {
    let i = target;
    while (i !== 0) {
      const len = l[i];
      for (let j = costs.length - 1; j >= 0; j--) {
        const k = i - costs[j];
        if (k >= 0 && l[k] + 1 === len) {
          res.push((j + 1).toString());
          i = k;
          break;
        }
      }
    }
  }
  return res.join("");
}

function brute(costs, target) {
  let max = 0n;
  function helper(cost, score) {
    if (cost === target) {
      if (score > max) {
        max = score;
      }
      return;
    }
    if (cost > target) {
      return;
    }
    for (let i = 0; i < costs.length; i++) {
      helper(cost + costs[i], 10n * score + BigInt(i) + 1n);
    }
  }
  helper(0, 0n);
  return max.toString();
}

(() => {
  console.assert(brute([4, 3, 2, 5, 6, 7, 2, 5, 5], 9) === "7772");
  console.assert(brute([7, 6, 5, 5, 5, 6, 8, 7, 8], 12) === "85");
  console.assert(brute([2, 4, 6, 2, 4, 6, 4, 4, 4], 5) === "0");
  console.assert(brute([6, 10, 15, 40, 40, 40, 40, 40, 40], 47) === "32211");
  console.assert(brute([2, 4, 6, 2, 4, 6, 4, 4, 4], 5) === "0");

  console.assert(largestNumber([4, 3, 2, 5, 6, 7, 2, 5, 5], 9) === "7772");
  console.assert(largestNumber([7, 6, 5, 5, 5, 6, 8, 7, 8], 12) === "85");
  console.assert(largestNumber([2, 4, 6, 2, 4, 6, 4, 4, 4], 5) === "0");
  console.assert(
    largestNumber([6, 10, 15, 40, 40, 40, 40, 40, 40], 47) === "32211"
  );
  console.assert(largestNumber([2, 4, 6, 2, 4, 6, 4, 4, 4], 5) === "0");
  console.log("checked");

  for (let i = 0; i < 1000; i++) {
    const costs = Array(9)
      .fill(0)
      .map(() => 1 + Math.floor(10 * Math.random()));
    const target = 1 + Math.floor(20 * Math.random());
    const expected = brute(costs, target);
    const test = largestNumber(costs, target);

    console.log(`for input [${costs}], ${target}`);
    if (test !== expected) {
      console.log(`got [${test}]`);
      console.log(`expected [${expected}]`);
    }
  }
})();

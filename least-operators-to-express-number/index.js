function leastOpsExpressTarget(x, target) {
  return helper(x, target, 0);
}

function helper(x, target, level) {
  // level 0 is for 1
  // level 2 is for x^2
  if (target === 0) {
    return -1;
  }
  const opCost = level === 0 ? 1 : level - 1;
  if (target === 1) {
    return opCost;
  }
  const mod = posMod(target, x);
  if (mod === 0) {
    return helper(x, target / x, level + 1);
  }
  const optionA = mod; // positive
  const optionB = x - mod; // negative
  const costA =
    helper(x, Math.floor(target / x), level + 1) + optionA * (1 + opCost);
  const costB =
    helper(x, Math.ceil(target / x), level + 1) + optionB * (1 + opCost);
  return Math.min(costA, costB);
}

function posMod(x, m) {
  return ((x % m) + m) % m;
}

console.log(leastOpsExpressTarget(3, 19));
console.log(leastOpsExpressTarget(5, 501));
console.log(leastOpsExpressTarget(100, 100000000));

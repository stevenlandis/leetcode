function maxProfit(prices) {
  if (prices.length === 0) return 0;
  const profit = new Array(prices.length).fill(0);
  for (let j = 0; j < 2; j++) {
    let min = prices[0];
    for (let i = 1; i < prices.length; i++) {
      min = Math.min(min, prices[i] - profit[i]);
      profit[i] = Math.max(profit[i - 1], prices[i] - min);
    }
  }
  return profit[profit.length - 1];
}

function bruteForce(prices) {
  let best = 0;
  for (let is = 0; is < prices.length; is++) {
    for (let ie = is + 1; ie < prices.length; ie++) {
      const p0 = prices[ie] - prices[is];
      best = Math.max(best, p0);
      for (let js = ie + 1; js < prices.length; js++) {
        for (let je = js + 1; je < prices.length; je++) {
          const p1 = prices[je] - prices[js];
          best = Math.max(best, p0 + p1);
        }
      }
    }
  }
  return best;
}

(() => {
  console.assert(bruteForce([3, 3, 5, 0, 0, 3, 1, 4]) === 6);
  console.assert(bruteForce([1, 2, 3, 4, 5]) === 4);
  console.assert(bruteForce([7, 6, 4, 3, 1]) === 0);
  console.assert(bruteForce([1]) === 0);
  console.assert(bruteForce([7, 7, 9, 7, 5, 3, 1, 3, 1, 9]) === 10);

  for (let i = 0; i < 100; i++) {
    const prices = Array(Math.floor(20 * Math.random()))
      .fill(0)
      .map(() => Math.floor(10 * Math.random()));
    const test = maxProfit(prices);
    const correct = bruteForce(prices);
    if (test !== correct) {
      console.log(`For prices: ${prices}:`);
      console.log(`Got ${test}, expected ${correct}`);
      break;
    }
  }
})();

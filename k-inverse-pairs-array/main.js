const MOD = 1000000007;
function modAdd(a, b) {
  return (((a + b) % MOD) + MOD) % MOD;
}
const lists = [new Int32Array([1])];
function getTotalN(n) {
  let sum = 0;
  for (let ni = 1; ni <= n; ni++) {
    const size = (ni * (ni - 1)) / 2 + 1;
    sum += size;
  }
  console.log(sum);
}
getTotalN(1000);
function prepLists(n) {
  let ni = 1;
  while (ni < n) {
    const l = lists[lists.length - 1];
    ni++;
    // const size = (ni * (ni - 1)) / 2 + 1;
    const size = Math.min(n + 1, (ni * (ni - 1)) / 2 + 1);
    const nl = new Int32Array(size).fill(0);
    let sum = 0;
    for (let ki = 0; ki < size; ki++) {
      const min = ki - ni;
      const max = ki;
      if (min >= 0) sum = modAdd(sum, -l[min]);
      if (max < l.length) sum = modAdd(sum, l[max]);
      nl[ki] = sum;
    }
    lists.push(nl);
  }
}
prepLists(1000);
function kInversePairs(n, k) {
  const l = lists[n - 1];
  return k >= l.length ? 0 : l[k];
}

const cache = {};
function kInversePairs2(n, k) {
  if (n <= 1) return 1;
  const key = `${n} ${k}`;
  if (key in cache) {
    return cache[key];
  }
  const prevMax = ((n - 1) * (n - 2)) / 2;
  const min = Math.max(0, k - n + 1);
  const max = Math.min(prevMax, k);
  let sum = 0;
  for (let ki = min; ki <= max; ki++) {
    sum = modAdd(sum, kInversePairs2(n - 1, ki));
  }
  cache[key] = sum;
  return sum;
}
// console.log("recusrive:", kInversePairs2(1000, 500));

function brute(n, k) {
  const remaining = [];
  for (let i = 1; i <= n; i++) {
    remaining.push(i);
  }
  const stack = [];
  const lists = [];
  function helper() {
    if (remaining.length === 0) {
      lists.push([...stack]);
    }
    for (let i = 0; i < remaining.length; i++) {
      const x = remaining[i];
      remaining.splice(i, 1);
      stack.push(x);
      helper();
      stack.pop();
      remaining.splice(i, 0, x);
    }
  }
  helper();
  // console.log(lists);
  let count = 0;
  for (const list of lists) {
    let tk = 0;
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        if (list[i] > list[j]) {
          tk++;
        }
      }
    }
    if (tk === k) {
      count = (count + 1) % MOD;
    }
  }
  return count;
}

(() => {
  console.log(kInversePairs(1000, 1000) === 663677020);
  console.log(kInversePairs(1000, 500) === 955735232);
  console.log(kInversePairs(1000, 501) === 838321593);
  console.log(kInversePairs(1000, 502) === 597903822);
  // console.log(kInversePairs2(1000, 500));
  return;
  // for (let i = 0; i <= 10; i++) {
  //   console.log("k:", i, ", count:", kInversePairs(5, i));
  //   kInversePairs(5, i);
  // }
  // console.log(kInversePairs(2, 1));
  // brute(4, 2);
  // return;
  console.assert(brute(3, 0) === 1);
  console.assert(brute(3, 1) === 2);

  for (let n = 1; n <= 8; n++) {
    const maxK = (n * (n - 1)) / 2;
    for (let k = 0; k <= maxK; k++) {
      // const c = brute(n, k);
      const c = kInversePairs(n, k);
      console.log(n, k, c);
    }
    console.log("-------------");
  }
})();

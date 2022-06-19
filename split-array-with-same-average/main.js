const { performance } = require("perf_hooks");

function splitArraySameAverage(nums) {
  if (nums.length < 2) return false;
  const N = nums.length;
  const Q = 300001;
  const sols = new Set();
  const S = nums.reduce((a, b) => a + b);
  for (let al = 1; al < N; al++) {
    const as = (S * al) / N;
    if (as !== Math.floor(as)) continue;
    sols.add(as + Q * al);
  }
  if (sols.size === 0) return false;
  const s = new Set();
  for (let i = 0; i < N; i++) {
    for (const x of [...s]) {
      const pas = x % Q;
      const pal = Math.floor(x / Q);
      const as = pas + nums[i];
      const al = pal + 1;
      const k = as + Q * al;
      if (sols.has(k)) return true;
      s.add(k);
    }
    const k = nums[i] + Q;
    if (sols.has(k)) return true;
    s.add(k);
  }
  return false;
}

// function splitArraySameAverage5(nums) {
//   if (nums.length < 2) return false;
//   nums.sort((a, b) => a - b);
//   function helper(i, as, al, bs, bl, rs) {
//     if (i === nums.length) {
//       return al > 0 && bl > 0 && as * bl === bs * al;
//     }
//     if (al === 0 || bl === 0) {
//       return (
//         helper(i + 1, as + nums[i], al + 1, bs, bl, rs - nums[i]) ||
//         helper(i + 1, as, al, bs + nums[i], bl + 1, rs - nums[i])
//       );
//     }

//     if (as * bl < bs * as) {
//       const tas = as + rs;
//       const tal = al + (nums.length - i);
//       if (tas * bl >= bs * tal) {
//         return (
//           helper(i + 1, as + nums[i], al + 1, bs, bl, rs - nums[i]) ||
//           helper(i + 1, as, al, bs + nums[i], bl + 1, rs - nums[i])
//         );
//       }
//       return false;
//     } else {
//       const tbs = bs + rs;
//       const tbl = bl + (nums.length - i);
//       if (tbs * al >= as * tbl) {
//         return (
//           helper(i + 1, as + nums[i], al + 1, bs, bl, rs - nums[i]) ||
//           helper(i + 1, as, al, bs + nums[i], bl + 1, rs - nums[i])
//         );
//       }
//       return false;
//     }
//   }
//   return helper(
//     0,
//     0,
//     0,
//     0,
//     0,
//     nums.reduce((a, b) => a + b)
//   );
// }

function splitArraySameAverage4(nums) {
  nums.sort((a, b) => a - b);
  function helper(i, as, al, bs, bl) {
    if (i === nums.length) {
      return al > 0 && bl > 0 && as * bl === bs * al;
    }
    if (al === 0 || bl === 0) {
      return (
        helper(i + 1, as + nums[i], al + 1, bs, bl) ||
        helper(i + 1, as, al, bs + nums[i], bl + 1)
      );
    }
    let aa = as / al;
    let bb = bs / bl;
    if (aa < bb) {
      let tas = as;
      let tal = al;
      let tbs = bs;
      let tbl = bl;
      for (let j = i; j < nums.length; j++) {
        if (nums[j] > tas / tal) {
          tas += nums[j];
          tal++;
        } else {
          tbs += nums[j];
          tbl++;
        }
        if (tas * tbl >= tbs * tal) {
          return (
            helper(i + 1, as + nums[i], al + 1, bs, bl) ||
            helper(i + 1, as, al, bs + nums[i], bl + 1)
          );
        }
      }
      return false;
    } else {
      let tas = as;
      let tal = al;
      let tbs = bs;
      let tbl = bl;
      for (let j = i; j < nums.length; j++) {
        if (nums[j] > tbs / tbl) {
          tbs += nums[j];
          tbl++;
        } else {
          tas += nums[j];
          tal++;
        }
        if (tbs * tal >= tas * tbl) {
          return (
            helper(i + 1, as + nums[i], al + 1, bs, bl) ||
            helper(i + 1, as, al, bs + nums[i], bl + 1)
          );
        }
      }
      return false;
    }
  }
  return helper(0, 0, 0, 0, 0);
}

function splitArraySameAverage3(nums) {
  function helper(i, as, al, bs, bl) {
    if (i === nums.length) {
      return al > 0 && bl > 0 && as * bl === bs * al;
    }
    return (
      helper(i + 1, as + nums[i], al + 1, bs, bl) ||
      helper(i + 1, as, al, bs + nums[i], bl + 1)
    );
  }
  return helper(0, 0, 0, 0, 0);
}

function splitArraySameAverage2(nums) {
  let as = 0;
  let al = 0;
  let bs = nums.reduce((a, b) => a + b);
  let bl = nums.length;
  const code = Array(nums.length).fill(false);
  for (let i = 0; i < (1 << nums.length) - 1; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (!(i & (1 << j))) {
        if (code[j]) {
          as -= nums[j];
          al--;
          bs += nums[j];
          bl++;
        } else {
          as += nums[j];
          al++;
          bs -= nums[j];
          bl--;
        }
        code[j] = !code[j];
        break;
      }
    }
    if (al > 0 && bl > 0 && as * bl === bs * al) {
      return true;
    }
  }
  return false;
}

function brute(nums) {
  for (let i = 0; i < 1 << nums.length; i++) {
    let as = 0;
    let al = 0;
    let bs = 0;
    let bl = 0;
    for (let j = 0; j < nums.length; j++) {
      if (i & (1 << j)) {
        as += nums[j];
        al++;
      } else {
        bs += nums[j];
        bl++;
      }
    }
    if (al > 0 && bl > 0 && as * bl === bs * al) {
      // console.log(as, al, bs, bl);
      return true;
    }
  }
  return false;
}
function sum(a) {
  let sum = 0;
  for (const x of a) {
    sum += x;
  }
  return sum;
}

(() => {
  console.log(brute([15, 6, 8, 19, 12, 14]) === true);
  console.log(splitArraySameAverage([15, 6, 8, 19, 12, 14]) === true);
  // return;
  console.log(brute([0, 8, 15, 4, 3]) === true);
  console.log(splitArraySameAverage([0, 8, 15, 4, 3]) === true);
  console.log(brute([1, 2, 3, 4, 5, 6, 7, 8]) === true);
  console.log(brute([3, 1]) === false);
  console.log(splitArraySameAverage([1, 2, 3, 4, 5, 6, 7, 8]) === true);
  console.log(splitArraySameAverage([3, 1]) === false);
  for (let i = 0; i < 100000; i++) {
    const nums = Array(Math.floor(10 * Math.random()))
      .fill(0)
      .map(() => Math.floor(20 * Math.random()));
    const t = splitArraySameAverage(nums);
    const e = brute(nums);
    if (t !== e) {
      console.log(`For nums=${nums}`);
      console.log(`got ${t}, expected ${e}`);
      return;
    }
  }
  console.log("tested");

  const t0 = performance.now();
  console.log(
    splitArraySameAverage([
      3863, 703, 1799, 327, 3682, 4330, 3388, 6187, 5330, 6572, 938, 6842, 678,
      9837, 8256, 6886, 2204, 5262, 6643, 829, 745, 8755, 3549, 6627, 1633,
      4290, 7,
    ]) === false
  );
  console.log(
    splitArraySameAverage([
      60, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
      30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
    ]) === false
  );
  const t1 = performance.now();
  console.log(`took ${t1 - t0} to do large`);
})();

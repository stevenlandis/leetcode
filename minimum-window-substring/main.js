function minWindow(s, t) {
  const lc = {};
  for (const c of t) {
    if (lc[c] === undefined) {
      lc[c] = 0;
    }
    lc[c]++;
  }
  const nl = Object.keys(lc).length;
  const cc = {};
  for (const c in lc) {
    cc[c] = 0;
  }
  let i = 0;
  let j = 0;
  let matches = 0;
  let bestI = -1;
  let bestLen = Infinity;
  while (true) {
    if (matches === nl) {
      const len = j - i;
      if (len < bestLen) {
        bestLen = len;
        bestI = i;
      }
    }
    if (i >= s.length) {
      break;
    }
    if (matches !== nl) {
      if (j >= s.length) {
        break;
      }
      const c = s[j];
      if (c in cc) {
        const x = cc[c] + 1;
        if (x === lc[c]) {
          matches++;
        }
        cc[c] = x;
      }
      j++;
    } else {
      const c = s[i];
      if (c in cc) {
        const x = cc[c] - 1;
        if (x + 1 === lc[c]) {
          matches--;
        }
        cc[c] = x;
      }
      i++;
    }
  }
  if (bestLen === Infinity) return "";
  return s.substr(bestI, bestLen);
}
function hasLetters(s, lc) {
  const t = { ...lc };
  let matches = 0;
  for (const c of s) {
    if (c in t) {
      const x = t[c] - 1;
      if (x === 0) {
        matches++;
      }
      t[c] = x;
    }
  }
  return matches === Object.keys(t).length;
}

(() => {
  console.log(minWindow("ADOBECODEBANC", "ABC") === "BANC");
  console.log(minWindow("a", "a") === "a");

  // minWindow("a".repeat(100000), "b".repeat(10000));
})();

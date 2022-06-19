function longestValidParentheses(s) {
  const lm = {};
  let n = 0;
  let l = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      if (!(n in lm)) {
        lm[n] = i;
      }
      n++;
    } else {
      n--;
      if (n in lm) {
        l = Math.max(l, i + 1 - lm[n]);
      }
      delete lm[n+1];
    }
  }
  return l;
}

function isValid(s) {
  let i = 0;
  for (const c of s) {
    if (c === '(') i++;
    else i--;
    if (i < 0) return false;
  }
  return i === 0;
}

function brute(s) {
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    for (let l = 1; i + l <= s.length; l++) {
      const ss = s.substr(i, l);
      if (!isValid(ss)) continue;
      max = Math.max(max, ss.length);
    }
  }
  return max;
}

(() => {
  ae(brute('(()'), 2);
  ae(brute(')()())'), 4);
  ae(brute(''), 0);
  ae(longestValidParentheses(')()()'), 4);
  ae(longestValidParentheses('(())('), 4);
  ae(longestValidParentheses(')(((()'), 2);
  for (let i = 0; i < 1000000; i++) {
    const n = ri(0, 10);
    let s = '';
    for (let j = 0; j < n; j++) {
      s += Math.random() < 0.5 ? ')' : '(';
    }
    const t = longestValidParentheses(s);
    const e = brute(s);
    if (!eq(t,e)) {
      console.log('failed for s:', s);
      ae(e,t);
    }
  }
})();
function ae(a, b) {
  if (!eq(a, b)) {
    console.log("A:", a);
    console.log("B:", b);
    throw "Assertion Error";
  }
}
const pr = console.log;
function ri(a, b) {
  return a + Math.floor((b - a + 1) * Math.random());
}
function eq(a, b) {
  if (a === b) return true;
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    return a.every((v, i) => eq(v, b[i]));
  }
  return false;
}

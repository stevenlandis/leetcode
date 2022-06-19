function isMatch(s, p) {
  p = parsePattern(p);
  // console.log(p);
  let state = new Set([0]);
  while (true) {
    const nextState = step(state, p, "");
    if (nextState.size === state.size) break;
    state = nextState;
  }
  for (const c of s) {
    state = step(state, p, c);
    while (true) {
      const nextState = step(state, p, "");
      if (nextState.size === state.size) break;
      state = nextState;
    }
    // console.log(state, c);
  }
  return state.has(p.length);
}
function parsePattern(p) {
  const res = [];
  let i = 0;
  while (true) {
    if (i >= p.length) break;
    const c = p[i];
    if (i + 1 < p.length && p[i + 1] === "*") {
      res.push(new Repeat(res.length, c));
      i++;
    } else if (c === ".") {
      res.push(new Any(res.length));
    } else {
      res.push(new Literal(res.length, c));
    }
    i++;
  }
  return res;
}
class Literal {
  constructor(i, c) {
    this.i = i;
    this.c = c;
  }
  next(state, c) {
    if (c === "") {
      state.add(this.i);
    } else if (c === this.c) {
      state.add(this.i + 1);
    }
  }
}
class Any {
  constructor(i) {
    this.i = i;
  }
  next(state, c) {
    if (c === "") {
      state.add(this.i);
    } else {
      state.add(this.i + 1);
    }
  }
}
class Repeat {
  constructor(i, c) {
    this.i = i;
    this.c = c;
  }
  next(state, c) {
    if (c === "") {
      state.add(this.i);
      state.add(this.i + 1);
    } else {
      if (this.c === "." || c === this.c) {
        state.add(this.i);
      }
      // state.add(this.i + 1);
    }
  }
}
function step(state, p, c) {
  const nextState = new Set();
  for (const i of state) {
    if (i >= p.length) {
      if (c === "") {
        nextState.add(i);
      }
      continue;
    }
    p[i].next(nextState, c);
  }
  return nextState;
}

(() => {
  console.log(isMatch("aa", "a") === false);
  console.log(isMatch("aa", "a*") === true);
  console.log(isMatch("abfds", ".*") === true);
  console.log(isMatch("aab", "c*a*b*") === true);
  console.log(isMatch("mississippi", "mis*is*p*.") === false);
  console.log(isMatch("mississippi", "mis*is*ip*.") === true);
})();

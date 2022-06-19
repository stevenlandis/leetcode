function buddyStrings(s, goal) {
  if (s.length !== goal.length) {
    return false;
  }
  let wrong = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== goal[i]) {
      wrong.push(i);
      if (wrong.length > 2) return false;
    }
  }
  if (wrong.length === 0) {
    const visited = new Set();
    for (const x of s) {
      if (visited.has(x)) return true;
      visited.add(x);
    }
    return false;
  } else if (wrong.length === 1) {
    return false;
  } else if (wrong.length === 2) {
    return s[wrong[0]] === goal[wrong[1]] && s[wrong[1]] === goal[wrong[0]];
  }
}

(() => {
  console.log(buddyStrings("ab", "ba") === true);
  console.log(buddyStrings("ab", "ab") === false);
  console.log(buddyStrings("aa", "aa") === true);
  console.log(buddyStrings("aaaaaaabc", "aaaaaaacb") === true);
})();

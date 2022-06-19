function sortString(s) {
  s = s.split("");
  s.sort();
  const p = Array(s.length).fill(false);
  let n = s.length;
  function pick(i) {
    p[i] = true;
    n--;
    return s[i];
  }
  const res = [];
  while (true) {
    if (n === 0) break;
    for (let i = 0; i < s.length; i++) {
      if (p[i]) continue;
      res.push(pick(i));
      break;
    }
    if (n === 0) break;
    for (let i = 0; i < s.length; i++) {
      if (p[i]) continue;
      if (s[i] > res[res.length - 1]) {
        res.push(pick(i));
      }
    }
    if (n === 0) break;
    for (let i = s.length - 1; i >= 0; i--) {
      if (p[i]) continue;
      res.push(pick(i));
      break;
    }
    if (n === 0) break;
    for (let i = s.length - 1; i >= 0; i--) {
      if (p[i]) continue;
      if (s[i] < res[res.length - 1]) {
        res.push(pick(i));
      }
    }
  }
  return res.join("");
}

(() => {
  console.log(sortString("aaaabbbbcccc") === "abccbaabccba");
  console.log(sortString("rat") === "art");
  console.log(sortString("leetcode") === "cdelotee");
  console.log(sortString("ggggggg") === "ggggggg");
  console.log(sortString("spo") === "ops");
})();

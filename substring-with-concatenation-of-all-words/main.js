function findSubstring(s, words) {
  const wim = new Map();
  for (let i = 0; i < words.length; i++) {
    if (!wim.has(words[i])) {
      wim.set(words[i], i);
    }
  }
  const cwm = new Map();
  for (const word of words) {
    const wi = wim.get(word);
    if (!cwm.has(wi)) {
      cwm.set(wi, 0);
    }
    cwm.set(wi, 1 + cwm.get(wi));
  }
  const wl = words[0].length;
  const nw = s.length - wl + 1;
  const wm = Array(nw).fill(0);
  for (let i = 0; i < nw; i++) {
    const ss = s.substr(i, wl);
    wm[i] = words.indexOf(ss);
  }
  const res = [];
  for (let i = 0; i < s.length - wl * words.length + 1; i++) {
    const temp = new Map(cwm);
    let matches = 0;
    for (let j = 0; j < words.length; j++) {
      const wi = wm[i + j * wl];
      const c = temp.get(wi) - 1;
      if (c === 0) {
        matches++;
      } else if (c === -1) {
        matches--;
      }
      temp.set(wi, c);
    }
    if (matches === cwm.size) {
      res.push(i);
    }
  }
  return res;
}

(() => {
  function arrEq(a, b) {
    return a.length === b.length && a.every((v, i) => v === b[i]);
  }
  console.log(
    arrEq(findSubstring("barfoothefoobarman", ["foo", "bar"]), [0, 9])
  );
  console.log(
    arrEq(
      findSubstring("wordgoodgoodgoodbestword", [
        "word",
        "good",
        "best",
        "word",
      ]),
      []
    )
  );
  console.log(
    arrEq(
      findSubstring("barfoofoobarthefoobarman", ["bar", "foo", "the"]),
      [6, 9, 12]
    )
  );

  console.log(
    arrEq(
      findSubstring("wordgoodgoodgoodbestword", [
        "word",
        "good",
        "best",
        "good",
      ]),
      [8]
    )
  );

  // findSubstring("a".repeat(10000), Array(5000).fill("a"));
  // findSubstring("a".repeat(10000), Array(5000).fill("a".repeat(30)));
})();

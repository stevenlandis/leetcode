function findLadders(start, end, list) {
  if (!list.includes(end)) {
    return [];
  }
  list.push(start);
  const nextWordCache = {};
  function getNextWords(word) {
    if (!(word in nextWordCache)) {
      const next = [];
      for (const w1 of list) {
        if (areClose(word, w1)) {
          next.push(w1);
        }
      }
      nextWordCache[word] = next;
    }
    return nextWordCache[word];
  }

  const stepsToEnd = {};
  function traverse() {
    let stack = [end];
    let depth = 0;
    const visited = new Set([end]);
    while (stack.length > 0) {
      const nextStack = [];
      for (const word of stack) {
        stepsToEnd[word] = depth;
        for (const nextWord of getNextWords(word)) {
          if (visited.has(nextWord)) {
            continue;
          }
          visited.add(nextWord);
          nextStack.push(nextWord);
        }
      }
      stack = nextStack;
      depth++;
    }
  }
  traverse();

  const paths = [];
  function getPaths() {
    const path = [start];
    function helper() {
      const w0 = path[path.length - 1];
      if (w0 === end) {
        paths.push([...path]);
        return;
      }
      const nextWords = getNextWords(w0);
      const nextWordsCosts = nextWords.map((word) => stepsToEnd[word]);
      const minCost = Math.min(...nextWordsCosts);
      const bestNextWords = [];
      for (let i = 0; i < nextWords.length; i++) {
        if (nextWordsCosts[i] === minCost) {
          bestNextWords.push(nextWords[i]);
        }
      }
      for (const w1 of bestNextWords) {
        path.push(w1);
        helper();
        path.pop();
      }
    }
    helper();
  }
  getPaths();
  return paths;
}
function areClose(w0, w1) {
  let diff = 0;
  for (let i = 0; i < w0.length; i++) {
    if (w0[i] !== w1[i]) {
      diff++;
    }
  }
  return diff === 1;
}

(() => {
  console.log(findLadders("hit", "cog", ["dot", "dog", "lot", "log", "cog"]));
  console.log(
    findLadders("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])
  );

  console.log(findLadders("hit", "cog", ["hot", "dot", "dog", "lot", "log"]));
  console.log(
    findLadders("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])
  );

  console.log(
    findLadders("qa", "sq", [
      "si",
      "go",
      "se",
      "cm",
      "so",
      "ph",
      "mt",
      "db",
      "mb",
      "sb",
      "kr",
      "ln",
      "tm",
      "le",
      "av",
      "sm",
      "ar",
      "ci",
      "ca",
      "br",
      "ti",
      "ba",
      "to",
      "ra",
      "fa",
      "yo",
      "ow",
      "sn",
      "ya",
      "cr",
      "po",
      "fe",
      "ho",
      "ma",
      "re",
      "or",
      "rn",
      "au",
      "ur",
      "rh",
      "sr",
      "tc",
      "lt",
      "lo",
      "as",
      "fr",
      "nb",
      "yb",
      "if",
      "pb",
      "ge",
      "th",
      "pm",
      "rb",
      "sh",
      "co",
      "ga",
      "li",
      "ha",
      "hz",
      "no",
      "bi",
      "di",
      "hi",
      "qa",
      "pi",
      "os",
      "uh",
      "wm",
      "an",
      "me",
      "mo",
      "na",
      "la",
      "st",
      "er",
      "sc",
      "ne",
      "mn",
      "mi",
      "am",
      "ex",
      "pt",
      "io",
      "be",
      "fm",
      "ta",
      "tb",
      "ni",
      "mr",
      "pa",
      "he",
      "lr",
      "sq",
      "ye",
    ])
  );
})();

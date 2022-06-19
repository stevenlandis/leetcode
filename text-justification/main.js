function fullJustify(words, maxWidth) {
  const lines = [];
  let line = [];
  let lineLen = 0;
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const nll = lineLen + word.length + (line.length === 0 ? 0 : 1);
    if (nll > maxWidth) {
      lines.push(line);
      line = [word];
      lineLen = word.length;
    } else {
      line.push(word);
      lineLen = nll;
    }
  }
  if (line.length > 0) {
    lines.push(line);
  }
  const res = [];
  for (let i = 0; i < lines.length; i++) {
    if (i < lines.length - 1) {
      res.push(formatFull(lines[i], maxWidth));
    } else {
      res.push(formatLeft(lines[i], maxWidth));
    }
  }
  return res;
}
function formatFull(words, width) {
  if (words.length === 1) {
    return `${words[0]}${" ".repeat(width - words[0].length)}`;
  }
  let sum = 0;
  for (const word of words) {
    sum += word.length;
  }
  const extra = width - sum;
  const size = extra / (words.length - 1);
  const is = [0];
  for (let i = 1; i < words.length; i++) {
    is.push(Math.round(size * i));
  }
  const gaps = [];
  for (let i = 0; i + 1 < is.length; i++) {
    gaps.push(is[i + 1] - is[i]);
  }
  gaps.sort((a, b) => b - a);
  const res = [];
  for (let i = 0; i < words.length; i++) {
    res.push(words[i]);
    if (i < gaps.length) {
      res.push(" ".repeat(gaps[i]));
    }
  }
  return res.join("");
}
function formatLeft(words, width) {
  const res = [];
  let len = 0;
  for (let i = 0; i < words.length; i++) {
    if (i > 0) {
      res.push(" ");
      len++;
    }
    res.push(words[i]);
    len += words[i].length;
  }
  res.push(" ".repeat(width - len));
  return res.join("");
}

(() => {
  function arrEq(a, b) {
    return a.length === b.length && a.every((v, i) => v === b[i]);
  }
  console.log(
    arrEq(
      fullJustify(
        ["This", "is", "an", "example", "of", "text", "justification."],
        16
      ),
      ["This    is    an", "example  of text", "justification.  "]
    )
  );
  console.log(
    arrEq(
      fullJustify(["What", "must", "be", "acknowledgment", "shall", "be"], 16),
      ["What   must   be", "acknowledgment  ", "shall be        "]
    )
  );
  console.log(
    arrEq(
      fullJustify(
        [
          "Science",
          "is",
          "what",
          "we",
          "understand",
          "well",
          "enough",
          "to",
          "explain",
          "to",
          "a",
          "computer.",
          "Art",
          "is",
          "everything",
          "else",
          "we",
          "do",
        ],
        20
      ),
      [
        "Science  is  what we",
        "understand      well",
        "enough to explain to",
        "a  computer.  Art is",
        "everything  else  we",
        "do                  ",
      ]
    )
  );
})();

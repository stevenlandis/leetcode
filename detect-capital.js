function detectCapitalUse(word) {
  const l = word.split("");
  if (l.every(isUp)) {
    return true;
  }
  if (l.every(isLo)) {
    return true;
  }
  return isUp(l[0]) && l.slice(1, l.length).every(isLo);
}
function isUp(c) {
  return "A" <= c && c <= "Z";
}
function isLo(c) {
  return "a" <= c && c <= "z";
}

(() => {
  console.log(detectCapitalUse("USA") === true);
  console.log(detectCapitalUse("FlaG") === false);
  console.log(detectCapitalUse("Google") === true);
})();

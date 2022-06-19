function reorderSpaces(text) {
  const words = text.split(" ").filter((w) => w !== "");
  const nSpaces = text.length - words.join("").length;
  const x = words.length === 1 ? 0 : Math.floor(nSpaces / (words.length - 1));
  const y = words.length === 1 ? nSpaces : nSpaces % (words.length - 1);
  const res = words.join(" ".repeat(x)) + " ".repeat(y);
  return res;
}

(() => {
  console.log(reorderSpaces("  hello") === "hello  ");
  console.log(
    reorderSpaces("  this   is  a sentence ") === "this   is   a   sentence"
  );
  console.log(
    reorderSpaces(" practice   makes   perfect") ===
      "practice   makes   perfect "
  );
  console.log(reorderSpaces("hello   world") === "hello   world");
  console.log(
    reorderSpaces("  walks  udp package   into  bar a") ===
      "walks  udp  package  into  bar  a "
  );
  console.log(reorderSpaces("a") === "a");
})();

function eq(a, b) {
  if (a === b) return true;
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    return a.every((v, i) => eq(v, b[i]));
  }
  return false;
}

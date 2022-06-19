function numDifferentIntegers(text) {
  text = text.split("");
  text = text.map((c) => ("0" <= c && c <= "9" ? c : " "));
  text = text.join("");
  text = text.split(" ");
  text = text.filter((w) => w !== "");
  text = text.map(rzp);
  text = new Set(text);
  return text.size;
}
function rzp(s) {
  let i = 0;
  while (i < s.length && s[i] === "0") {
    i++;
  }
  if (i === s.length) return "0";
  return s.substr(i, s.length);
}

(() => {
  console.log(rzp("0") === "0");
  console.log(rzp("00000000") === "0");
  console.log(rzp("1") === "1");
  console.log(rzp("0000123") === "123");
  console.log(numDifferentIntegers("a123bc34d8ef34") === 3);
  console.log(numDifferentIntegers("leet1234code234") === 2);
  console.log(numDifferentIntegers("a1b01c001") === 1);
})();

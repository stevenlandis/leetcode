function checkOnesSegment(s) {
  s = s.split("0");
  s = s.filter((q) => q !== "");
  return s.length <= 1;
}

(() => {
  console.log(checkOnesSegment("1001") === false);
  console.log(checkOnesSegment("110") === true);
  console.log(checkOnesSegment("10000011110101") === false);
})();

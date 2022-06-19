function reformatNumber(number) {
  number = number.split("");
  number = number.filter((c) => "0" <= c && c <= "9");
  const blocks = [];
  const rem = number.length % 3;
  let max, end;
  switch (rem) {
    case 0:
      max = number.length;
      end = [];
      break;
    case 1:
      max = number.length - 4;
      end = [
        [number[number.length - 4], number[number.length - 3]],
        [number[number.length - 2], number[number.length - 1]],
      ];
      break;
    case 2:
      max = number.length - 2;
      end = [[number[number.length - 2], number[number.length - 1]]];
      break;
  }
  for (let i = 0; i < max; i += 3) {
    blocks.push(number.slice(i, i + 3));
  }
  blocks.push(...end);
  return blocks.map((block) => block.join("")).join("-");
}

(() => {
  console.log(reformatNumber("1-23-45 6") === "123-456");
  console.log(reformatNumber("123 4-567") === "123-45-67");
  console.log(reformatNumber("123 4-5678") === "123-456-78");
  console.log(reformatNumber("12") === "12");
  console.log(reformatNumber("--17-5 229 35-39475 ") === "175-229-353-94-75");
})();

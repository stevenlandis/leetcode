function isLongPressedName(name, typed) {
  let i = 0;
  let j = 0;
  while (true) {
    if (j === typed.length) {
      return i === name.length;
    }
    if (name[i] === typed[j]) {
      i++;
    } else if (i > 0 && name[i - 1] === typed[j]) {
    } else {
      return false;
    }
    j++;
  }
}

(() => {
  console.log(isLongPressedName("alex", "aaleex") === true);
  console.log(isLongPressedName("alex", "aaleexxxx") === true);
  console.log(isLongPressedName("alex", "aaleexa") === false);
  console.log(isLongPressedName("saeed", "ssaaedd") === false);
  console.log(isLongPressedName("leelee", "lleeelee") === true);
  console.log(isLongPressedName("laiden", "laiden") === true);
  console.log(isLongPressedName("alexd", "ale") === false);
})();

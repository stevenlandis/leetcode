function checkIfExist(arr) {
  const s = new Set(arr);
  let zc = 0;
  for (const x of arr) {
    if (x === 0) zc++;
  }
  for (const x of arr) {
    if (x === 0) {
      if (zc >= 2) {
        return true;
      }
    } else if (s.has(2 * x)) {
      return true;
    }
  }
  return false;
}

(() => {
  console.log(checkIfExist([10, 2, 5, 3]) === true);
  console.log(checkIfExist([7, 1, 14, 11]) === true);
  console.log(checkIfExist([3, 1, 7, 11]) === false);
  console.log(checkIfExist([-2, 0, 10, -19, 4, 6, -8]) === false);
  console.log(checkIfExist([-2, 0, 0, 10, -19, 4, 6, -8]) === true);
  console.log(checkIfExist([-20, 8, -6, -14, 0, -19, 14, 4]) === true);
})();

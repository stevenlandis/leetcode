function canThreePartsEqualSum(arr) {
  const sum = arr.reduce((a, b) => a + b);
  if (sum % 3 !== 0) return false;
  const goal = sum / 3;
  let i = 0;
  let ts = 0;
  while (true) {
    if (i === arr.length) return false;
    ts += arr[i];
    if (ts === goal) break;
    i++;
  }
  let j = i + 1;
  ts = 0;
  while (true) {
    if (j === arr.length) return false;
    ts += arr[j];
    if (ts === goal) break;
    j++;
  }
  return j < arr.length - 1;
}

(() => {
  console.log(
    canThreePartsEqualSum([
      99, 32, 89, -10, 68, 33, 94, 48, 68, 14, 98, 49, 47, -18, -46, 11, -78,
      -22, -70, -32, -74, 71, 3, 100, 60, -50, 21, 41, 38, 5, -20, -37, -73,
      -25, 38, 65, 77, -83, 50, -32, 10, 20, 2, 47, -93, 27, -69, 50, -10, -27,
      -90, 19, 57, -87, -59, 80, -100, -13, -51, 83, -4, -73, 72, 92, 92, 19,
      93, 36, 84, 94, -42, 83, 44, 92, -52, 60, -11, -91, -71, -48, 31, 2, 10,
      -22, -3, 86, -77, -5, 37, 25, 42, 33, -83, 40, -44, 88, -64, -51, -66, 46,
      -98, -63, -73, -30, -48, 66, 98, 94, -9, -20, -60, 97, -96, 71, -69, 25,
      53, 64, 86, -58, -26, 6, -28, -58, -83, -89, 33, 34, 38, -95, -30, -39,
      -50, -27, 100, -76, 17, -51, -68, -87, 64, -54, -41, -56, 91, 70, 2, 81,
      -72, -13, -98, 81, -42, 36, -67, -48, -64, -24, -83, 98, -32, 18, 84, -96,
      -26, 46, -97, -60, -85, -3,
    ]) === false
  );
  console.log(canThreePartsEqualSum([1, -1, 1, -1]) === false);
  console.log(
    canThreePartsEqualSum([18, 12, -18, 18, -19, -1, 10, 10]) === true
  );
  console.log(
    canThreePartsEqualSum([0, 2, 1, -6, 6, -7, 9, 1, 2, 0, 1]) === true
  );
  console.log(
    canThreePartsEqualSum([0, 2, 1, -6, 6, 7, 9, -1, 2, 0, 1]) === false
  );
  console.log(canThreePartsEqualSum([3, 3, 6, 5, -2, 2, 5, 1, -9, 4]) === true);
})();

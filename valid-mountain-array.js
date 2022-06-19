function validMountainArray(arr) {
  if (arr.length < 3) return false;
  if (arr[1] <= arr[0]) return false;
  let n = arr[1];
  let s = 0;
  for (let i = 2; i < arr.length; i++) {
    if (arr[i] === n) return false;
    if (s === 0) {
      if (arr[i] < n) {
        s = 1;
      }
    } else if (s === 1) {
      if (arr[i] > n) return false;
    }
    n = arr[i];
  }
  return s === 1;
}

(() => {
  console.log(validMountainArray([1, 3, 2]) === true);
  console.log(validMountainArray([2, 1]) === false);
  console.log(validMountainArray([3, 5, 5]) === false);
  console.log(validMountainArray([0, 3, 2, 1]) === true);
})();

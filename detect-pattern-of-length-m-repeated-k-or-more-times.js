function containsPattern(arr, m, k) {
  for (let i = 0; i < arr.length - m * k + 1; i++) {
    let match = true;
    for (let ki = 1; ki < k; ki++) {
      for (let mi = 0; mi < m; mi++) {
        if (arr[i + mi] !== arr[i + mi + m * ki]) {
          match = false;
          break;
        }
      }
      if (!match) break;
    }
    if (match) return true;
  }
  return false;
}

(() => {
  console.log(containsPattern([1, 2, 4, 4, 4, 4], 1, 3) === true);
  console.log(containsPattern([1, 2, 1, 2, 1, 1, 1, 3], 2, 2) === true);
  console.log(containsPattern([1, 2, 1, 2, 1, 3], 2, 3) === false);
  console.log(containsPattern([1, 2, 3, 1, 2], 2, 2) === false);
  console.log(containsPattern([2, 2, 2, 2], 2, 3) === false);
})();

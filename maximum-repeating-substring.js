function maxRepeating(sequence, word) {
  for (let k = Math.floor(sequence.length / word.length); k >= 1; k--) {
    if (sequence.indexOf(word.repeat(k)) >= 0) {
      return k;
    }
  }
  return 0;
}

(() => {
  console.log(maxRepeating("ababc", "ab") === 2);
  console.log(maxRepeating("ababc", "ba") === 1);
  console.log(maxRepeating("ababc", "ac") === 0);
})();

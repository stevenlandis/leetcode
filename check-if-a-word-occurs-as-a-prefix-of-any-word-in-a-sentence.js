function isPrefixOfWord(sentence, searchWord) {
  const words = sentence.split(" ");
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word.length < searchWord.length) continue;
    let j = 0;
    while (j < searchWord.length) {
      if (word[j] !== searchWord[j]) {
        break;
      }
      j++;
    }
    if (j === searchWord.length) {
      return i + 1;
    }
  }
  return -1;
}

(() => {
  console.log(isPrefixOfWord("i love eating burger", "burg") === 4);
  console.log(isPrefixOfWord("this problem is an easy problem", "pro") === 2);
  console.log(isPrefixOfWord("i am tired", "you") === -1);
  console.log(isPrefixOfWord("i use triple pillow", "pill") === 4);
})();

function canPlaceFlowers(flowerbed, n) {
  let placed = 0;
  for (let i = 0; i < flowerbed.length; i++) {
    const prev = i === 0 ? 0 : flowerbed[i - 1];
    const next = i + 1 === flowerbed.length ? 0 : flowerbed[i + 1];
    if (prev === 0 && flowerbed[i] === 0 && next === 0) {
      flowerbed[i] = 1;
      placed++;
    }
  }
  return placed >= n;
}

(() => {
  console.log(canPlaceFlowers([1, 0, 0, 0, 1], 1) === true);
  console.log(canPlaceFlowers([1, 0, 0, 0, 1], 2) === false);
})();

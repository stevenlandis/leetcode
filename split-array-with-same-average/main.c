#include <stdio.h>
#include <time.h>
typedef int bool;

int main() {
  int nums[] = {
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    60,
  };
  int N = 30;
  clock_t t0 = clock();
  bool res = splitArraySameAverage(nums, N);
  clock_t t1 = clock();
  printf("res: %d\n in %fms", res, ((float)(t1 - t0) / 1000000.0F) * 1000.0F);
  return 0;
}

bool splitArraySameAverage(int *nums, int numsSize) {
  int sum = 0;
  for (int i = 0; i < numsSize; i++) {
    sum += nums[i];
  }
  return helper(nums, numsSize, 0, 0, 0, 0, 0, sum);
}

bool helper(int *nums, int n, int i, int as, int al, int bs, int bl, int rs) {
  if (i == n) {
    return al > 0 && bl > 0 && as * bl == bs * al;
  }
  if (al == 0 || bl == 0) {
    return (
      helper(nums, n, i + 1, as + nums[i], al + 1, bs, bl, rs - nums[i]) ||
      helper(nums, n, i + 1, as, al, bs + nums[i], bl + 1, rs - nums[i])
    );
  }
  if (as * bl < bs * as) {
    const tas = as + rs;
    const tal = al + (n - i);
    if (tas * bl >= bs * tal) {
      return (
        helper(nums, n, i + 1, as + nums[i], al + 1, bs, bl, rs - nums[i]) ||
        helper(nums, n, i + 1, as, al, bs + nums[i], bl + 1, rs - nums[i])
      );
    }
    return 0;
  } else {
    const tbs = bs + rs;
    const tbl = bl + (n - i);
    if (tbs * al >= as * tbl) {
      return (
        helper(nums, n, i + 1, as + nums[i], al + 1, bs, bl, rs - nums[i]) ||
        helper(nums, n, i + 1, as, al, bs + nums[i], bl + 1, rs - nums[i])
      );
    }
    return 0;
  }
}

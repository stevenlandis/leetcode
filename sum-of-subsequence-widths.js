const MOD = 1000000007;
function posMod(a) {
  return ((a % MOD) + MOD) % MOD;
}
function modAdd(a, b) {
  return Number((BigInt(a) + BigInt(b)) % BigInt(MOD));
}
function modMul(a, b) {
  return Number((BigInt(a) * BigInt(b)) % BigInt(MOD));
}
function sumSubseqWidths(nums) {
  const N = nums.length;
  if (N <= 1) return 0;
  nums.sort((a, b) => a - b);
  const subSums = Array(N).fill(0);
  subSums[0] = nums[0];
  for (let i = 1; i < N; i++) {
    subSums[i] = modAdd(subSums[i - 1], nums[i]);
  }
  const pows = Array(N - 1).fill(0);
  pows[0] = 1;
  for (let i = 1; i < N - 1; i++) {
    pows[i] = modMul(pows[i - 1], 2);
  }
  let sum = 0;
  for (let len = 2; len <= N; len++) {
    const n = pows[len - 2];
    const sa = subSums[N - 1] - subSums[len - 2];
    const sb = subSums[N - len];
    sum = modAdd(sum, modMul(n, posMod(sa - sb)));
  }
  return sum;
}
function sumSubseqWidths2(nums) {
  nums.sort((a, b) => a - b);
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const min = nums[i];
      const max = nums[j];
      const p = j - i - 1;
      let n = 1;
      for (let k = 0; k < p; k++) {
        n = modMul(n, 2);
      }
      sum = modAdd(sum, modMul(max - min, n));
    }
  }
  return sum;
}

function brute(nums) {
  let res = 0;
  function helper(i, min, max, n) {
    if (i === nums.length) {
      if (n > 0) {
        res = modAdd(res, max - min);
      }
      return;
    }
    helper(i + 1, Math.min(min, nums[i]), Math.max(max, nums[i]), n + 1);
    helper(i + 1, min, max, n);
  }
  helper(0, Infinity, -Infinity, 0);
  return res;
}

const pr = console.log;
(() => {
  ae(sumSubseqWidths([1, 3, 6, 10, 11, 14]), 531);
  ae(brute([2, 1, 3]), 6);
  ae(brute([]), 0);
  ae(brute([1]), 0);
  ae(brute([1, 2]), 1);
  for (let i = 0; i < 1000; i++) {
    const nums = Array(ri(0, 100))
      .fill(0)
      .map(() => ri(1, 20));
    const t = sumSubseqWidths(nums);
    const e = sumSubseqWidths2(nums);
    if (t !== e) {
      pr(`for nums=[${nums}]`);
      pr(`got ${t}, expected ${e}`);
      return;
    }
  }
  pr("tested");

  sumSubseqWidths(
    Array(20000)
      .fill(0)
      .map(() => ri(1, 20000))
  );
  pr("done");
  ae(
    sumSubseqWidths([
      6649, 3141, 7396, 3345, 9431, 7335, 1972, 5339, 2170, 7101, 596, 8559,
      9559, 9168, 5254, 6542, 2404, 7402, 2290, 652, 2977, 2401, 37, 122, 5099,
      6574, 142, 1255, 6688, 786, 3769, 4256, 1472, 7639, 3041, 8782, 2520,
      7300, 4575, 6570, 251, 8390, 9916, 233, 4304, 1929, 1845, 2502, 9861,
      2634, 6905, 1657, 2129, 6683, 952, 6226, 7172, 8921, 5463, 6733, 4939,
      2732, 2477, 7991, 8357, 6260, 8858, 967, 4590, 8004, 6443, 4747, 3966,
      5402, 9091, 4143, 6868, 6221, 287, 2125, 9381, 4804, 7169, 9965, 4571,
      8580, 4524, 6722, 9552, 4552, 6475, 3784, 7092, 9267, 5749, 9212, 3554,
      7948, 2975, 7565, 7815, 6123, 3705, 3696, 4510, 4243, 3841, 9327, 8317,
      5679, 9680, 513, 3355, 6617, 1290, 903, 4600, 2999, 146, 8148, 5266, 5194,
      2827, 9707, 9317, 5559, 6276, 7745, 1464, 4948, 6863, 3948, 5058, 4566,
      1684, 2121, 1450, 1336, 5436, 4442, 1412, 8352, 1342, 8806, 464, 3362,
      6847, 9566, 9767, 6072, 7352, 4263, 2696, 2616, 5547, 754, 9657, 1568,
      788, 706, 4041, 8304, 6210, 3287, 9934, 6882, 1945, 4745, 7110, 1673,
      7439, 8336, 9698, 1207, 7027, 9761, 4804, 6384, 1998, 8096, 5571, 5324,
      9822, 6878, 2013, 9349, 3584, 5073, 5222, 2520, 9784, 1197, 6560, 9082,
      2793, 6870, 2930, 3062, 3221, 7686, 2054, 4743, 4320, 2501, 2424, 3764,
      4138, 994, 3314, 9794, 4711, 6341, 2396, 4791, 600, 4727, 438, 9077, 8167,
      9228, 7464, 923, 1258, 661, 6940, 1969, 8309, 2757, 1284, 529, 7610, 9120,
      3675, 3184, 4632, 3871, 9794, 2396, 1299, 6081, 7956, 964, 7994, 3902,
      1991, 1454, 8332, 3284, 1049, 7029, 7793, 4431, 4158, 7203, 7639, 7356,
      3579, 8082, 1977, 4650, 2836, 4192, 1569, 2845, 3347, 5161, 2329, 429,
      6254, 9209, 7145, 3603, 7649, 81, 3961, 7352, 4577, 2355, 2566, 7088,
      2008, 3415, 9699, 7431, 4609, 8001, 9714, 6748, 8520, 9273, 2621, 2513,
      5607, 2469, 8944, 8255, 1741, 4399, 9493, 2633, 7231, 8797, 2108, 9719,
      4869, 2576, 3418, 814, 5944, 3329, 4748, 2536, 9933, 9301, 9473, 1213,
      2997, 939, 4116, 9750, 5728, 3186, 8267, 8026, 2422, 4826, 230, 1594,
      2924, 691, 9897, 7314, 1528, 6590, 6697, 612, 9925, 5122, 3552, 7888,
      5302, 5985, 5760, 9029, 4590, 8855, 8342, 6117, 658, 4459, 9168, 9110,
      7674, 7754, 6983, 8751, 4058, 730, 9143, 8474, 9650, 443, 7307, 3078,
      8538, 4293, 4330, 5896, 28, 9935, 1849, 574, 3545, 9206, 4106, 4327, 600,
      8368, 6739, 1543, 6443, 7636, 6493, 5640, 7364, 8577, 124, 8492, 1198,
      175, 4293, 4414, 8846, 7768, 1338, 42, 993, 8570, 5269, 9028, 9637, 3461,
      6855, 949, 8255, 6240, 5027, 3805, 633, 4343, 7560, 3756, 1605, 7194,
      5961, 4634, 4976, 1886, 2529, 7763, 7341, 4657, 1469, 5822, 321, 4876,
      5153, 9438, 6807, 4400, 8224, 2782, 6482, 1132, 7817, 2507, 2198, 1876,
      2294, 6492, 2684, 2652, 3976, 158, 9596, 4974, 215, 2858, 9143, 4260,
      2959, 843, 6215, 5658, 6340, 1014, 8257, 9540, 1183, 3083, 7556, 9870,
      5216, 4938, 7093, 490, 4037, 2377, 789, 508, 4172, 4051, 1780, 5643, 8333,
      8943, 620, 1468, 6630, 5808, 3313, 2567, 2604, 6198, 3747, 455, 4695,
      4433, 8172, 6490, 9385, 6526, 9785, 3386, 2552, 1243, 6019, 5580, 4762,
      8054, 7103, 6500, 3770, 8599, 3430, 7062, 6059, 6487, 6091, 9397, 5627,
      7453, 9198, 6356, 325, 3548, 8321, 1960, 4199, 6848, 6469, 4098, 3885,
      9077, 6735, 1462, 9696, 4521, 8247, 5848, 9869, 708, 6593, 9354, 7690,
      1905, 3888, 1028, 889, 8803, 230, 3835, 7502, 9697, 6050, 3430, 2092,
      5293, 878, 4456, 1198, 223, 4625, 5950, 4191, 6068, 9986, 4024, 3897,
      2585, 4016, 7196, 829, 8969, 4635, 9690, 8418, 376, 1560, 6191, 2303,
      9170, 4557, 8002, 531, 7554, 1691, 5501, 7469, 9477, 9215, 4937, 5977,
      3485, 3325, 1997, 7315, 6388, 7357, 3963, 7184, 6806, 3479, 2937, 8654,
      6913, 5955, 7233, 6537, 357, 112, 3823, 1039, 9787, 101, 8828, 6315, 7771,
      5937, 5263, 2751, 387, 5478, 3604, 4033, 3935, 2138, 830, 3434, 9210,
      1342, 183, 6638, 980, 8270, 5450, 5688, 378, 9338, 2578, 2945, 5068, 1557,
      9430, 9995, 3109, 705, 8947, 102, 3350, 956, 7544, 6023, 3381, 7608, 2583,
      190, 121, 3700, 8079, 2616, 9424, 7701, 9094, 4578, 3265, 4551, 270, 8775,
      2925, 277, 4967, 703, 4923, 2471, 4815, 73, 9595, 9759, 121, 5789, 3025,
      4699, 7216, 3603, 4054, 3725, 6472, 2990, 1565, 4558, 8451, 3216, 4158,
      2621, 8447, 3526, 4568, 4375, 5364, 5918, 171, 978, 6514, 2400, 7237,
      3672, 3031, 8951, 1775, 4643, 4396, 4206, 7862, 5333, 3139, 6134, 7492,
      3532, 1770, 701, 6417, 3643, 4173, 6142, 9850, 8222, 6494, 1482, 5356,
      9761, 5625, 1382, 6064, 2489, 4468, 6646, 8757, 2819, 1633, 9622, 1300,
      970, 4723, 2155, 9659, 7913, 3426, 2229, 3930, 2612, 887, 9585, 8104,
      2784, 1020, 5463, 3220, 6478, 8922, 2520, 3530, 4496, 2797, 5367, 5364,
      7281, 6423, 8284, 5605, 8702, 1062, 922, 6799, 3636, 924, 2202, 9807,
      9400, 8648, 4502, 554, 1891, 3836, 933, 9103, 8776, 1237, 2198, 5746,
      7511, 6818, 2480, 7658, 5788, 8843, 1476, 5141, 6129, 2532, 3486, 5889,
      4365, 2565, 6286, 1329, 9775, 7301, 9756, 6445, 5785, 5446, 2176, 7754,
      1128, 6904, 803, 3956, 2785, 5941, 8496, 8978, 1077, 1146, 5709, 2602,
      4242, 828, 4162, 5048, 7152, 2897, 2157, 5635, 8307, 2159, 8092, 957, 321,
      176, 4658, 7287, 9106, 6971, 3773, 5133, 7845, 7677, 971, 9383, 2511,
      8383, 1138, 4989, 4972, 5707, 8084, 6747, 5311, 5306, 3977, 376, 4037,
      2877, 2840, 460, 683, 6186, 891, 8070, 7942, 3708, 3821, 5261, 9685, 7186,
      5332, 4403, 4368, 4028, 2295, 6657, 4066, 6263, 109, 8550, 1526, 3881,
      8401, 304, 8746, 5101, 6467, 4398, 1420, 3886, 2697, 3953, 4522, 331,
      4574, 3039, 6581, 8017, 3917, 5783, 2454, 3838, 4100, 3209, 3384, 4734,
      2336, 2439, 5469, 700, 7033, 4171, 9302, 1286, 3122, 32, 1968, 9938, 4365,
      9674, 2890, 9121, 7053, 2344, 1637, 8337, 9159, 2209, 2843, 4027, 6103,
      376, 701, 6120, 81, 7823, 6061, 1451, 9428, 7357, 4330, 3139, 8118, 8290,
      4180, 8871, 6290, 7666, 6672, 5996, 9121, 6565, 5442, 8166, 7238, 9975,
      3098, 9824, 520, 5105, 1252, 3754, 6326, 9236, 1154, 6595, 8271, 4032,
      860, 2690, 2294, 6171, 9416, 3575, 5899, 346, 8369, 3295, 3226, 8999,
      5351, 9510, 6110, 8811, 6730, 3537, 6711, 195, 7890, 6202, 2279, 4589,
      3776, 5332, 7713, 3932, 2266, 4686, 3377, 4107, 4730, 750, 7559, 9120,
      780, 3683, 8037, 6691, 8585, 285, 1962, 4014, 3936, 1874, 6802, 8100,
      3479, 1085, 8520, 5690, 3100, 9216, 2984, 409, 7997, 5942, 9720, 6977,
      9787, 997, 2254, 4220, 464, 5131, 7440, 7511, 4711, 2760, 340, 9579, 3803,
      2816, 6669, 9415, 2869, 2034, 4418, 869, 8984, 4964, 8275, 9683, 9553,
      5436, 9977, 8004, 3438, 2568, 4203, 6105, 2554, 4187, 5358, 3236, 2226,
      2440, 9583, 3032, 3008, 4673, 1876, 1536, 1006, 492, 30, 3331, 5375, 8018,
      5620, 9477, 1458, 7739, 1422, 2234, 6234, 4622, 7873, 5667, 8925, 5925,
      8955, 6834, 4388, 8290, 3768, 76, 3619, 5584, 6084, 2005, 7767, 2289,
      5000, 9641, 492, 8860, 9723, 9402, 8301, 9793, 1335, 8654, 9560, 2975,
      6108, 1647, 7397, 9783, 4655, 1590, 8017, 2123, 5185, 8958, 1448, 4022,
      3269, 217, 7057, 6026, 8719, 7340, 6907, 4192, 2426, 6854, 9648, 5188,
      8820, 8455, 288, 6101, 4629, 8300, 1995, 5194, 4413, 1997, 4022, 8775,
      6017, 3119, 741, 911, 7333, 2187, 2266, 9162, 3657, 101, 4349, 1744, 3536,
      3565, 221, 8050, 529, 7447, 9999, 3184, 2485, 8760, 3984, 2641, 3965,
      1667, 2533, 26, 8955, 1029, 4651, 6635, 8885, 66, 7937, 5115, 9721, 5072,
      1109, 4253, 2800, 247, 8596, 3508, 1086, 1067, 1735, 3979, 2104, 1780,
      4481, 8424, 4882, 8008, 1517, 4237, 774, 863, 9951, 6097, 8026, 5937,
      5919, 7159, 9307, 2163, 42, 437, 9377, 1626, 8130, 3261, 547, 9929, 7431,
      3495, 904, 2106, 7233, 5280, 8721, 3630, 1084, 3299, 9747, 4568, 7480,
      5954, 3437, 7528, 4082, 7941, 2271, 4912, 9517, 4527, 8803, 347, 9627,
      7540, 9432, 1049, 2382, 3067, 5978, 1351, 3369, 9754, 418, 4605, 1097,
      2399, 6660, 4646, 3649, 1858, 2005, 6367, 3484, 6858, 5055, 683, 1262,
      3064, 4910, 8797, 1063, 6337, 8820, 769, 8424, 915, 3621, 1748, 8328,
      4830, 4216, 3979, 6491, 9004, 7255, 6085, 8807, 7802, 6297, 1317, 2371,
      9563, 2548, 3769, 1848, 7334, 3240, 5651, 8303, 1363, 3415, 3535, 8669,
      8447, 1087, 7789, 641, 1470, 6906, 5409, 3671, 9478, 9809, 9408, 4153,
      7221, 7552, 9977, 6858, 8703, 5370, 7096, 7379, 6075, 4106, 1875, 7995,
      3580, 1420, 2277, 8052, 2711, 5245, 5043, 7885, 5615, 9985, 454, 3676,
      1557, 6592, 7214, 9569, 144, 1093, 5145, 8700, 3343, 2793, 7649, 5459,
      5633, 9392, 5462, 6167, 799, 4255, 7596, 8839, 8155, 6463, 2705, 5757,
      8255, 3484, 9639, 4642, 2853, 1995, 4116, 7101, 9788, 2146, 8366, 3034,
      6276, 8459, 1801, 7609, 5793, 6022, 7265, 9491, 1931, 2882, 6985, 2182,
      1441, 9368, 8427, 6117, 7547, 929, 2255, 6688, 9733, 1285, 1428, 7895,
      3085, 261, 3795, 2689, 3890, 9297, 252, 6410, 214, 5268, 2629, 7029, 1436,
      154, 9324, 3438, 1861, 2534, 5177, 8971, 7717, 8238, 1823, 3157, 2498,
      9655, 5950, 5258, 3791, 9553, 5676, 5476, 7087, 5149, 9834, 1922, 5624,
      298, 8251, 577, 5869, 7618, 9681, 6759, 3880, 8275, 3196, 7065, 1419, 50,
      7223, 8770, 8932, 6424, 4210, 8594, 7403, 574, 8333, 908, 8098, 5676,
      3142, 9978, 6342, 6827, 7808, 8860, 5859, 7842, 5629, 2996, 2316, 9834,
      3697, 1496, 9084, 9080, 4637, 8068, 5950, 7334, 8638, 5726, 7247, 8214,
      6744, 424, 2642, 9456, 859, 2869, 5922, 715, 3731, 1456, 8959, 8631, 9146,
      2737, 9764, 6777, 7480, 3777, 7141, 1085, 7275, 8682, 4929, 4980, 7554,
      1947, 5549, 6991, 1219, 6656, 5133, 5425, 1679, 7802, 320, 5224, 1386,
      7002, 2240, 7194, 5467, 6271, 313, 1124, 7867, 3828, 364, 2164, 3592,
      1626, 7317, 8504, 7507, 3181, 2772, 8840, 4672, 9450, 1611, 5665, 2242,
      459, 9021, 6265, 4395, 9190, 1187, 6045, 4496, 9081, 2894, 8211, 3792,
      3545, 6014, 5568, 8536, 15, 9226, 2383, 1120, 6243, 3941, 7241, 8703,
      8046, 3985, 3435, 7156, 9102, 368, 226, 8363, 6782, 814, 7750, 7574, 6206,
      8295, 4474, 2156, 7931, 1101, 8508, 7494, 1753, 6478, 6054, 4244, 8931,
      9762, 4419, 3100, 5556, 7784, 4472, 305, 1959, 9316, 7589, 65, 1689, 8653,
      940, 2382, 5129, 9483, 6273, 2087, 2873, 6682, 8762, 6367, 2906, 4239,
      4395, 5036, 4762, 2441, 8034, 1601, 188, 6284, 8538, 7096, 1301, 82, 9372,
      8359, 4830, 7360, 2919, 5901, 330, 9911, 7727, 8330, 169, 6649, 8606,
      7859, 7555, 2793, 9440, 5972, 4972, 9822, 3788, 1477, 7170, 420, 8698,
      6544, 9359, 7035, 3084, 8220, 1556, 8834, 3639, 8787, 797, 3874, 1192,
      8800, 9116, 9375, 2816, 9594, 5241, 3311, 8955, 449, 6193, 1360, 2119,
      7144, 8404, 7905, 296, 3020, 1290, 3407, 2806, 4051, 3103, 1638, 8711,
      6452, 4070, 2042, 6261, 7341, 4599, 2263, 291, 2629, 341, 3506, 2288,
      2845, 2162, 9363, 6823, 1727, 7400, 5411, 356, 260, 6348, 2212, 8471,
      6429, 8094, 5490, 1727, 3318, 7954, 9046, 5575, 8559, 8000, 7074, 9834,
      785, 4461, 4851, 4767, 5078, 1580, 6346, 2227, 1711, 9431, 9265, 5333,
      9675, 3487, 2686, 7904, 6650, 7934, 2467, 7280, 3075, 7423, 8069, 732,
      3270, 9737, 4021, 9621, 2739, 3661, 7720, 3237, 283, 7442, 2241, 5752,
      8008, 7899, 3744, 9594, 2005, 8863, 9777, 6482, 9422, 3148, 7071, 4284,
      2202, 3260, 3579, 6067, 3607, 5614, 5672, 7995, 9312, 4774, 2269, 4581,
      2397, 1329, 9647, 8515, 9783, 7975, 8659, 8624, 5897, 6931, 4309, 2485,
      9106, 4201, 1223, 9477, 183, 218, 9489, 3209, 5972, 7956, 3909, 1368,
      5486, 7308, 8908, 525, 2617, 8113, 7078, 8353, 6600, 6905, 8474, 4110,
      4983, 7861, 5692, 3662, 2151, 6613, 3684, 1937, 7799, 3948, 9301, 4506,
      7938, 4958, 7198, 1764, 2480, 4153, 1281, 5091, 8583, 7460, 553, 9248,
      1125, 4814, 6006, 8330, 2403, 1130, 5218, 4410, 6939, 8108, 9523, 9654,
      52, 159, 8999, 5926, 5852, 4669, 3557, 8601, 3187, 9996, 8377, 8700, 5256,
      8859, 682, 772, 8508, 2484, 9508, 873, 2934, 6706, 3913, 6228, 2503, 7943,
      8374, 4834, 6128, 6443, 9248, 5432, 5487, 4007, 3712, 9183, 1886, 4956,
      5492, 2949, 4251, 1501, 9522, 9300, 2599, 1692, 7159, 6048, 5527, 4906,
      9191, 2831, 3059, 3637, 1226, 4363, 4324, 65, 870, 3564, 1676, 406, 8196,
      3163, 6813, 4889, 5991, 5662, 7237, 2045, 2440, 5135, 8162, 7096, 6664,
      964, 4615, 6349, 6024, 3692, 8181, 7043, 1777, 8611, 569, 4201, 2084,
      5761, 9154, 9843, 6534, 3704, 2921, 4512, 1902, 6552, 4887, 102, 2236,
      9510, 95, 8323, 2355, 8415, 8866, 6119, 9225, 1021, 5786, 8325, 1087,
      7947, 6839, 4958, 8742, 8690, 4894, 3292, 5764, 4205, 8967, 5980, 3998,
      6706, 7816, 7690, 3428, 8623, 4848, 3638, 6616, 9984, 6067, 4579, 2522,
      8530, 965, 8446, 9091, 2809, 6056, 2998, 1687, 1533, 9451, 1347, 7347,
      1100, 9017, 8847, 6526, 1676, 4685, 4081, 7461, 373, 2615, 8623, 1207,
      5889, 6910, 278, 658, 2359, 5173, 2751, 9521, 9981, 5590, 9687, 1231,
      4224, 6828, 9971, 6734, 4122, 18, 3153, 8331, 9446, 2283, 5286, 2079,
      2043, 2975, 8762, 2023, 3854, 4096, 4732, 926, 9293, 4813, 4950, 2449,
      1473, 4292, 406, 5469, 6334, 6771, 2053, 59, 6917, 6320, 6876, 1213, 1262,
      1280, 5491, 2830, 3059, 634, 4597, 4889, 1689, 8729, 757, 6099, 7182,
      9324, 1879, 9456, 2762, 6087, 2147, 9727, 4135, 3620, 8184, 9086, 164,
      6409, 9426, 4995, 5408, 958, 6713, 4864, 2355, 1515, 647, 4112, 9885,
      9351, 3606, 992, 8738, 2724, 9253, 7185, 1215, 3986, 5248, 5192, 8152,
      7199, 1579, 6583, 967, 7729, 3224, 8959, 1351, 9598, 6933, 4964, 6765,
      2083, 3373, 4054, 8125, 4970, 5154, 5561, 5448, 7759, 4546, 3342, 7004,
      4660, 8310, 4185, 2242, 6962, 3057, 8083, 9953, 7934, 6610, 9327, 466,
      5552, 3056, 303, 5977, 7373, 2572, 769, 2267, 3574, 2290, 5384, 6614,
      2710, 3785, 6987, 9384, 8811, 5937, 4295, 5826, 5236, 1313, 9161, 8769,
      3216, 3958, 5106, 3419, 3398, 8636, 1512, 7097, 2515, 8216, 733, 5252,
      2062, 3062, 8655, 5165, 6019, 6776, 351, 8874, 178, 2801, 6512, 1344,
      9391, 6036, 1630, 9531, 4654, 8126, 4534, 1304, 2048, 9338, 6150, 8426,
      3165, 636, 1683, 2050, 6450, 1808, 2854, 6580, 4399, 2923, 3286, 1472,
      4663, 1682, 5405, 4505, 4200, 4443, 9614, 62, 3218, 7904, 7237, 8446,
      4545, 692, 7791, 1273, 8279, 9131, 9193, 483, 7310, 2274, 4272, 8190, 514,
      7516, 7875, 5320, 4099, 3241, 3377, 3420, 6615, 3667, 4765, 6308, 7539,
      130, 1656, 3358, 8758, 5668, 6025, 7878, 4011, 5278, 9192, 2558, 4151,
      491, 6763, 8915, 8659, 2859, 3759, 3233, 3872, 1495, 835, 9706, 7466, 699,
      8991, 7029, 113, 8032, 4919, 9773, 7156, 8563, 9175, 7143, 8759, 3670,
      9272, 6803, 143, 7483, 8732, 9749, 7807, 533, 3826, 7907, 9140, 507, 3344,
      319, 8247, 1659, 4562, 7804, 1404, 6755, 4403, 6480, 1569, 6519, 6021,
      9175, 4670, 4835, 2259, 9001, 3450, 3558, 7106, 1228, 3914, 3015, 9293,
      5367, 5461, 6551, 310, 5169, 3648, 4737, 1628, 1138, 1451, 5575, 7307,
      1091, 6856, 8259, 2920, 8649, 9411, 9841, 615, 4822, 681, 7234, 3497,
      9909, 8316, 9982, 6417, 5331, 3659, 8695, 3104, 4254, 3349, 8217, 192,
      1751, 6156, 6454, 2425, 9354, 2110, 7547, 6763, 2988, 1044, 5004, 2092,
      738, 1346, 4571, 8808, 8612, 1886, 3618, 6785, 9134, 6301, 9045, 3147,
      9988, 4886, 8780, 5552, 8213, 6564, 2351, 584, 7422, 5722, 6562, 2865,
      2086, 2867, 4595, 5210, 3700, 1605, 7154, 7520, 5988, 724, 2056, 6837,
      7468, 8280, 4327, 8644, 9595, 2578, 8734, 2374, 4741, 3237, 2118, 6367,
      8752, 3303, 2232, 9611, 7362, 4375, 5232, 9888, 3970, 8447, 6770, 5252,
      2499, 9296, 7070, 7653, 9679, 1831, 838, 6748, 7992, 9111, 3209, 8903,
      1517, 7029, 9514, 7299, 2415, 5408, 6126, 5514, 7884, 1719, 3217, 9973,
      624, 4770, 4637, 4556, 6990, 208, 9330, 8002, 3086, 9256, 1631, 5100,
      7526, 7833, 3311, 4275, 2876, 7746, 6889, 8427, 2243, 6353, 3521, 5495,
      5873, 6477, 1703, 3934, 3367, 7132, 2917, 3163, 6189, 867, 6877, 107,
      1686, 7260, 9932, 7966, 3611, 3478, 7439, 9825, 5386, 5997, 2647, 1633,
      4158, 5435, 4128, 9001, 9090, 6575, 415, 2497, 1946, 8208, 3188, 3486,
      7368, 1977, 7, 9170, 8164, 46, 2751, 582, 3811, 6063, 9938, 8452, 1659,
      3519, 9286, 6990, 5960, 3798, 3064, 3498, 2686, 6182, 4476, 6613, 8876,
      7211, 6638, 1224, 3722, 4640, 2296, 9929, 7946, 7610, 4835, 9328, 3897,
      7092, 1919, 6948, 2330, 6070, 2077, 711, 8215, 4800, 254, 5554, 7672,
      6425, 2365, 1550, 8074, 4681, 4057, 7293, 8268, 4644, 9096, 1557, 6688,
      7936, 5403, 8588, 2403, 946, 8041, 165, 3858, 2043, 1230, 9658, 9797,
      1352, 8611, 7788, 66, 3839, 520, 5613, 9189, 49, 2717, 7481, 2811, 234,
      3079, 1817, 337, 8077, 9989, 610, 971, 1112, 9409, 7423, 3890, 6215, 4344,
      6141, 8726, 8632, 8845, 1327, 1581, 7875, 9605, 3817, 1610, 4649, 1821,
      9984, 2915, 5125, 266, 2912, 3774, 5273, 5389, 8486, 7161, 7597, 9006,
      7949, 4407, 1322, 6314, 7454, 198, 7560, 9286, 6557, 5725, 456, 4096,
      5633, 7738, 6729, 6482, 2888, 657, 9199, 2821, 711, 1531, 970, 6054, 2400,
      9510, 5221, 8368, 5377, 8866, 7270, 2323, 6137, 9959, 3905, 7141, 1566,
      4377, 2117, 7148, 653, 6037, 4448, 7473, 1762, 2571, 1048, 4455, 6152,
      8858, 7280, 2372, 4317, 7400, 8575, 1898, 9040, 6599, 3983, 7348, 1342,
      7885, 189, 2722, 5745, 1308, 647, 3351, 6209, 3931, 2398, 5909, 2661,
      5790, 1150, 3419, 8095, 6672, 6870, 387, 2462, 4813, 7520, 5202, 6494,
      625, 6138, 4516, 9310, 2280, 4741, 1979, 462, 1101, 2060, 9027, 2802,
      3126, 4491, 3304, 1109, 56, 5277, 4056, 5861, 3927, 3981, 553, 1154, 933,
      5888, 5907, 723, 2976, 9808, 5083, 563, 7208, 2446, 5187, 8481, 9644, 488,
      601, 2269, 2561, 693, 2764, 4038, 2534, 597, 764, 2610, 4146, 8243, 8454,
      8104, 8061, 9896, 7681, 4310, 2384, 7178, 6334, 8173, 6278, 8013, 6432,
      9654, 2414, 6547, 5916, 2280, 5475, 1768, 4772, 4906, 5505, 9732, 1489,
      2672, 6004, 7541, 8703, 9368, 1956, 172, 5133, 6766, 2499, 9941, 9612,
      2689, 6987, 5730, 4951, 8104, 2406, 4250, 2876, 1390, 9476, 2624, 1470,
      3555, 6823, 2774, 4298, 473, 8391, 8422, 6735, 9214, 5177, 1698, 4749,
      480, 9678, 3341, 6255, 7265, 7825, 8682, 6424, 7352, 9072, 7196, 9238,
      1577, 1613, 9728, 8804, 3240, 3223, 2011, 3378, 2628, 6746, 9093, 6418,
      3565, 6426, 1087, 1836, 8143, 2226, 4189, 9524, 1254, 7202, 1386, 9766,
      9348, 3225, 8721, 80, 7401, 5560, 2270, 6952, 2587, 6871, 2648, 4702,
      3850, 7650, 8820, 7314, 4401, 4359, 2969, 2402, 136, 6832, 3638, 8004,
      1427, 7872, 991, 2858, 4684, 6903, 965, 3872, 7463, 5922, 9424, 5700,
      3490, 9086, 9827, 3988, 5010, 3296, 2801, 8904, 240, 1043, 6694, 8821,
      7971, 1955, 1430, 4678, 5509, 5091, 8440, 8162, 3240, 8085, 7153, 4990,
      3977, 5973, 7228, 5844, 3320, 2692, 9399, 376, 3401, 2497, 4819, 3518,
      6174, 6613, 1778, 7289, 8690, 249, 6362, 9407, 7837, 7901, 345, 4393, 799,
      1726, 4224, 2862, 7942, 7062, 7612, 838, 1235, 5782, 3020, 8054, 1755,
      8289, 9009, 2551, 4595, 3191, 4741, 5241, 8520, 9104, 8172, 4323, 3643,
      5959, 7798, 1465, 2928, 498, 6561, 811, 3996, 2337, 4640, 6333, 9301,
      4671, 2694, 9775, 88, 5784, 3155, 397, 2120, 3498, 1323, 7151, 2020, 6706,
      3315, 1437, 6277, 1747, 3788, 354, 5597, 1630, 4855, 9604, 8461, 4976,
      1891, 2279, 3666, 5684, 8245, 9204, 5999, 1742, 3254, 4256, 6290, 2939,
      3296, 2945, 8509, 4504, 1184, 9654, 3999, 2780, 2436, 2693, 7295, 2697,
      5093, 3860, 8078, 8694, 185, 9130, 9707, 4007, 9414, 9, 1684, 2983, 5995,
      2835, 1647, 1892, 9130, 8945, 6076, 8418, 2330, 4474, 6981, 7679, 660,
      9309, 9156, 1631, 7993, 421, 4196, 7615, 6950, 6112, 4585, 7087, 4384,
      2348, 4913, 8137, 491, 196, 5151, 8983, 4953, 4634, 7520, 7933, 2061,
      2331, 4272, 2145, 5764, 9941, 8100, 8207, 4098, 9123, 2666, 6614, 2963,
      9537, 7280, 9284, 861, 4866, 2271, 955, 4955, 6094, 564, 3485, 3843, 5566,
      6905, 3340, 1604, 6643, 3755, 5108, 8904, 9388, 9113, 5409, 9647, 863,
      4146, 7677, 26, 6009, 4410, 6635, 8859, 5515, 9128, 4146, 6967, 6052,
      6200, 3150, 4431, 982, 3375, 2407, 6939, 6953, 7108, 323, 9304, 279, 4883,
      5668, 2283, 3679, 5424, 4882, 5246, 6299, 3261, 9245, 1443, 4696, 9068,
      400, 2035, 448, 4889, 4280, 7861, 8657, 2036, 9742, 5937, 1922, 8840,
      4076, 3757, 2188, 5340, 3884, 8961, 8869, 2031, 7350, 4954, 4322, 4921,
      2032, 1698, 869, 4441, 3003, 537, 642, 7960, 3693, 2715, 2945, 7686, 1821,
      560, 295, 1596, 722, 9786, 7460, 3013, 7480, 9293, 2134, 9153, 6225, 9290,
      6315, 1322, 3077, 6622, 3873, 3840, 7684, 6829, 7215, 2271, 1474, 940,
      9028, 6202, 4162, 8080, 8876, 8054, 8160, 8197, 4618, 8223, 4757, 3076,
      2104, 5168, 7603, 1321, 3717, 8957, 3749, 4802, 8615, 5527, 9850, 9201,
      3758, 6630, 699, 2250, 7377, 572, 9055, 4560, 8380, 1380, 2588, 835, 9380,
      9334, 3911, 3422, 8164, 2771, 1804, 4679, 4199, 4478, 7797, 4483, 9400,
      4008, 925, 1403, 8195, 9361, 3291, 484, 1485, 1375, 3637, 9806, 2120,
      4842, 8308, 321, 3536, 9006, 9263, 8391, 1959, 9259, 718, 5491, 396, 9172,
      9245, 7857, 4856, 4460, 1374, 5407, 2449, 4893, 8855, 2511, 3640, 7722,
      1142, 5276, 4765, 5949, 3926, 7086, 6564, 6380, 6992, 6165, 7277, 4163,
      4274, 7306, 8087, 4927, 2643, 9375, 5221, 8380, 7064, 8922, 5668, 5047,
      3380, 3840, 8083, 9260, 5370, 3781, 1215, 4469, 3398, 2621, 2, 109, 5803,
      9364, 9780, 5594, 2845, 6834, 1286, 9242, 1070, 3014, 3661, 5030, 6614,
      6905, 8325, 6426, 330, 7401, 376, 9728, 7069, 1513, 4834, 3273, 2865,
      4022, 9996, 5518, 6752, 5902, 5365, 896, 8776, 263, 9153, 6663, 1446,
      7619, 7425, 9918, 2445, 3027, 7962, 9234, 4914, 7940, 7607, 7303, 405,
      8283, 2321, 5834, 4665, 3315, 5506, 4147, 3222, 6945, 8390, 8591, 1840,
      548, 1210, 6098, 6068, 9510, 7558, 3132, 8464, 7918, 4638, 8653, 6026,
      6730, 3306, 8619, 1100, 6437, 1989, 1618, 4396, 212, 7471, 1295, 1743, 14,
      8685, 248, 5771, 6277, 3516, 5223, 5579, 5784, 2368, 1989, 1588, 9254,
      2761, 4779, 3480, 598, 4680, 1213, 5598, 369, 3421, 4812, 8789, 3367,
      3084, 9720, 4687, 4883, 6186, 4453, 1020, 7334, 4657, 1582, 4758, 1910,
      809, 8580, 9945, 2261, 3550, 3233, 2649, 3240, 8672, 3379, 3134, 737,
      3683, 2582, 5843, 6962, 2782, 1240, 7422, 5986, 3060, 2649, 8834, 5910,
      8174, 107, 1311, 7298, 2545, 6583, 7745, 253, 5879, 3590, 2579, 9773,
      3397, 4136, 2670, 4751, 6531, 1522, 1153, 8250, 7106, 6682, 1106, 8464,
      7466, 9358, 9518, 9626, 4990, 910, 2644, 1863, 5610, 7695, 1330, 8497,
      9219, 963, 5613, 859, 9391, 9567, 4105, 4896, 8647, 591, 3140, 6303, 2577,
      767, 2666, 9276, 4898, 6725, 4327, 1217, 4565, 3527, 9601, 5385, 9353,
      5021, 4959, 2600, 3647, 5023, 3954, 242, 2020, 4659, 6730, 6119, 9083,
      5538, 6464, 834, 1727, 4487, 9596, 5334, 76, 4021, 9641, 4825, 9327, 2281,
      4589, 6097, 5061, 1438, 1528, 2575, 4751, 8576, 858, 4211, 4025, 8087,
      7361, 8200, 911, 4908, 7900, 4513, 995, 3616, 2433, 9721, 4422, 5890,
      7379, 2662, 852, 7048, 9068, 4532, 8160, 3655, 3678, 318, 3147, 4119,
      7821, 1922, 1359, 3887, 3257, 4022, 5413, 930, 2505, 7560, 1292, 3493,
      7768, 5985, 222, 8637, 4787, 3313, 6182, 5568, 3278, 9363, 7008, 7597,
      8336, 3538, 5934, 3590, 4935, 3631, 4523, 2426, 2104, 3429, 3941, 1238,
      9873, 6040, 4266, 7725, 9258, 6582, 6499, 1664, 1438, 5346, 4557, 3368,
      5265, 3466, 8344, 3214, 8627, 7578, 9539, 1123, 8657, 5118, 692, 3844,
      1685, 1153, 1329, 8824, 3828, 7257, 6007, 659, 8445, 4120, 9216, 8703,
      8209, 7990, 5621, 5203, 7358, 4429, 9733, 8134, 5791, 9195, 1216, 6371,
      2763, 1858, 2166, 6202, 8772, 8390, 7781, 5604, 6854, 2502, 8723, 1813,
      7880, 1688, 8049, 1817, 6378, 2815, 762, 2135, 5689, 2028, 7947, 7410,
      2836, 878, 6447, 5520, 5583, 294, 5545, 8589, 4829, 7428, 3285, 8862,
      5587, 5880, 1034, 2341, 2817, 2291, 3046, 5413, 139, 7037, 7984, 9391,
      1627, 5714, 2744, 1374, 598, 8863, 6156, 2833, 2244, 1311, 350, 7405, 566,
      9873, 3425, 8796, 1682, 846, 881, 906, 4765, 3, 5234, 4678, 8460, 8609,
      7373, 3039, 9415, 5501, 8736, 5028, 5522, 9469, 3253, 4168, 1744, 2853,
      9005, 4078, 1438, 5893, 1102, 5620, 6948, 4580, 1969, 9475, 4303, 9865,
      3191, 6007, 8657, 1746, 6176, 2576, 7235, 8037, 322, 5670, 4308, 953,
      6130, 2451, 223, 8791, 5560, 8431, 6410, 9843, 2252, 4763, 8579, 6251,
      1558, 5442, 6945, 6060, 3089, 4303, 6085, 637, 1170, 2977, 8420, 4884,
      8522, 8748, 8980, 4234, 7890, 5228, 4296, 7307, 1614, 1132, 4558, 8924,
      2590, 311, 494, 6358, 1920, 4198, 2789, 8836, 8418, 7262, 2526, 7083,
      3435, 2294, 6084, 4862, 9792, 4822, 7857, 3826, 4287, 627, 5460, 7151,
      9987, 7347, 9444, 5433, 4439, 9085, 5486, 2802, 8242, 4338, 3330, 6361,
      8535, 8647, 4975, 6049, 2759, 8474, 7751, 4059, 553, 7773, 3624, 6501,
      3305, 4837, 5571, 5690, 3886, 7751, 6716, 471, 3043, 8881, 3075, 5588,
      1657, 2966, 9612, 1679, 9654, 9943, 3322, 5296, 4956, 6478, 5504, 9181,
      3274, 5624, 8397, 7926, 1795, 8195, 4689, 9491, 3233, 9737, 7763, 7990,
      9064, 8188, 5743, 5979, 9547, 6860, 6959, 1248, 3024, 3134, 8148, 2963,
      1924, 2017, 7706, 3129, 5383, 6597, 4624, 3851, 3504, 5951, 7245, 5220,
      8286, 9664, 5733, 501, 6340, 2761, 9794, 307, 2821, 7413, 882, 911, 3922,
      754, 4307, 6126, 8451, 1369, 5329, 3676, 6855, 5297, 2553, 4422, 688,
      3847, 4378, 1310, 442, 5782, 9463, 7546, 7357, 7624, 406, 6172, 5908,
      1122, 5460, 2797, 2800, 7672, 2710, 3815, 7872, 3136, 6070, 3555, 8237,
      8218, 1158, 5001, 4213, 5940, 8933, 4250, 9075, 6073, 3108, 2589, 8665,
      7340, 2893, 5651, 7239, 4348, 8848, 4061, 6663, 2735, 8988, 119, 8485,
      3651, 3956, 9173, 7715, 8746, 1324, 7609, 6625, 7592, 1457, 495, 636, 958,
      6112, 1081, 8899, 6888, 5855, 2567, 6968, 9617, 278, 3434, 9474, 2782,
      7071, 5931, 9505, 9744, 5331, 5655, 8292, 4100, 8922, 4767, 3501, 6168,
      3887, 9385, 6370, 1125, 576, 5347, 2567, 1757, 5372, 7462, 804, 3035,
      5730, 1831, 3818, 6357, 7573, 3158, 6548, 1666, 8761, 7614, 2252, 7623,
      9904, 3070, 6164, 2114, 509, 2107, 5231, 7766, 4486, 1612, 2012, 6908,
      9573, 6518, 4038, 3663, 9138, 3741, 9637, 908, 6478, 1354, 2817, 9786,
      6330, 770, 8367, 1730, 6645, 8402, 150, 9165, 1459, 816, 7902, 498, 6621,
      4008, 4400, 2616, 8185, 7035, 5045, 9354, 2274, 7625, 5396, 1801, 7102,
      8935, 2846, 4019, 9245, 9042, 226, 831, 7653, 9942, 3037, 4042, 4955,
      8471, 2289, 9764, 5461, 979, 6039, 9333, 6741, 5251, 7156, 9718, 6379,
      5636, 4587, 7924, 533, 5335, 1228, 2641, 9520, 7258, 6500, 6787, 5152,
      8526, 2628, 1941, 7337, 1125, 5433, 520, 4045, 4530, 5556, 3337, 915,
      1542, 554, 3697, 4468, 5908, 1351, 2624, 1272, 7124, 9304, 1324, 6040,
      7269, 8285, 1079, 9404, 8950, 1141, 1582, 1221, 338, 8292, 7098, 3695,
      3700, 6348, 1949, 5461, 3473, 4582, 374, 2569, 8280, 2049, 9162, 7479,
      5211, 414, 1911, 1022, 3825, 3760, 3948, 2757, 718, 3425, 7314, 4778,
      1330, 874, 5232, 9079, 6109, 9123, 5840, 1648, 5785, 1611, 7286, 8911,
      5548, 5225, 4585, 1557, 3512, 4185, 5568, 7403, 1137, 3621, 9458, 5453,
      4662, 6963, 4883, 5363, 1622, 7114, 3514, 3122, 4031, 2946, 1091, 2853,
      3680, 384, 6520, 7577, 8800, 9375, 517, 9305, 4389, 2233, 2559, 8850,
      2302, 2134, 8847, 7464, 839, 3055, 3618, 3590, 2507, 8020, 6153, 8885,
      6380, 7758, 6070, 3375, 8684, 3403, 7657, 5471, 6330, 2485, 7646, 2646,
      8512, 7134, 4530, 3279, 4123, 7408, 6043, 5743, 674, 9179, 2590, 873,
      5652, 8059, 8034, 3403, 5793, 7505, 7680, 7425, 3405, 7070, 5212, 1702,
      3674, 3353, 8253, 3702, 4108, 9756, 5316, 4704, 9828, 1088, 4486, 4046,
      4909, 3780, 3753, 4941, 630, 7607, 4062, 6426, 1993, 47, 3263, 8088, 8641,
      5475, 9093, 9869, 7245, 6564, 5666, 5924, 2274, 6145, 585, 1067, 7756,
      2058, 4914, 925, 7774, 9687, 8059, 5481, 1651, 4020, 8662, 7080, 8435,
      2556, 1733, 1636, 8460, 2671, 7199, 1258, 1102, 9364, 298, 7559, 2412,
      2817, 4961, 455, 1706, 710, 8404, 7686, 5068, 6660, 4295, 1244, 7027,
      4632, 2419, 6083, 7455, 6206, 7979, 4379, 6337, 3562, 1110, 8397, 8860,
      2791, 4592, 4234, 1559, 4019, 504, 4276, 131, 473, 1501, 214, 6833, 1320,
      5630, 4997, 6330, 5071, 7351, 7873, 6423, 740, 605, 7926, 4605, 6933,
      8800, 9282, 6671, 4801, 803, 2475, 9726, 4574, 7198, 2250, 5100, 3586,
      6754, 2255, 7022, 3958, 3815, 8863, 7769, 946, 2095, 6278, 5765, 1684,
      7795, 2450, 6781, 8198, 1960, 2653, 5399, 3818, 983, 7097, 9085, 8516,
      7504, 6591, 3893, 6646, 2929, 662, 7273, 4401, 3807, 3293, 4586, 731,
      4462, 4237, 2043, 4553, 335, 1187, 5467, 9016, 2314, 7880, 2515, 4183,
      5755, 2097, 3627, 2734, 4528, 7474, 1656, 7491, 8250, 4763, 5024, 2297,
      9396, 655, 9169, 5037, 4854, 5913, 8498, 5762, 2203, 6042, 9164, 64, 8684,
      4347, 2583, 7932, 9899, 4666, 1954, 3202, 8258, 8515, 8720, 957, 7431,
      5574, 5826, 4270, 3942, 6379, 133, 1955, 4078, 4809, 6369, 9463, 1670,
      5142, 5412, 3076, 9814, 1995, 5235, 1576, 8168, 5170, 8181, 8068, 4470,
      1246, 9066, 6210, 4496, 8238, 5291, 8031, 8256, 3537, 9131, 6385, 6717,
      5301, 121, 630, 9675, 8716, 80, 2453, 9598, 6688, 1960, 3828, 1507, 9798,
      2253, 6947, 9529, 9547, 3977, 3908, 7069, 9544, 8849, 7256, 3776, 2919,
      3002, 8906, 3769, 1618, 4164, 97, 8115, 4812, 7943, 108, 9588, 9716, 5019,
      8826, 9643, 8816, 1699, 617, 6171, 5046, 2851, 7412, 2355, 2294, 9320,
      1678, 515, 2252, 2964, 4803, 405, 4765, 6414, 3914, 3319, 9338, 107, 4761,
      5358, 8143, 3712, 7117, 8163, 1308, 8381, 6656, 3074, 7100, 8928, 9497,
      1797, 9588, 9660, 6250, 2958, 5191, 6932, 6379, 4214, 5680, 5757, 9536,
      3031, 8646, 8425, 2850, 9334, 4235, 4512, 8422, 173, 3611, 511, 8974,
      8214, 9227, 8162, 3197, 3207, 7049, 1170, 1014, 1245, 4096, 3756, 3296,
      8053, 4973, 5704, 2236, 365, 5620, 5238, 7051, 8696, 9055, 3788, 1740,
      6270, 8857, 2863, 6091, 1545, 5228, 1077, 886, 5196, 1069, 3277, 9925,
      1428, 2216, 5535, 5299, 7026, 8531, 3769, 7633, 7722, 2538, 3909, 3823,
      9495, 2597, 992, 5249, 23, 677, 351, 5401, 4408, 5216, 3293, 1271, 5200,
      4557, 3433, 5361, 8138, 5938, 6987, 6402, 4384, 5818, 2952, 4155, 6118,
      4409, 8981, 1542, 3105, 3093, 5944, 2002, 5703, 3936, 3364, 6402, 8392,
      3345, 4787, 7321, 760, 9643, 6495, 7110, 7615, 3929, 5372, 1712, 4116,
      4080, 3627, 452, 7379, 6116, 2784, 1808, 9399, 8438, 4489, 7642, 932,
      5012, 746, 832, 3086, 4940, 7906, 8686, 8610, 4950, 8564, 6844, 7477, 468,
      6002, 4170, 3189, 3850, 6242, 3515, 1317, 2242, 1111, 4268, 4373, 6121,
      2410, 3998, 6850, 4098, 5830, 2679, 8257, 4280, 6520, 6834, 7848, 39,
      1692, 6074, 2997, 7646, 1128, 1380, 2213, 5185, 2823, 7536, 621, 1502,
      7984, 4385, 8934, 5347, 6622, 7760, 566, 5465, 5847, 2811, 5935, 7295,
      3421, 5494, 8463, 4021, 8076, 9336, 9706, 5544, 1010, 9528, 2312, 2285,
      1194, 8581, 3020, 9627, 2006, 5303, 3253, 9923, 395, 1917, 7131, 5262,
      6405, 330, 8685, 3791, 3275, 8219, 4582, 1226, 2091, 7773, 4355, 2125,
      2037, 4107, 4271, 388, 5063, 717, 6816, 2696, 8190, 3264, 7216, 1092,
      9508, 101, 2984, 1359, 1719, 7371, 1130, 9304, 2535, 3472, 353, 9791,
      6669, 9288, 6696, 1512, 457, 9022, 523, 9449, 5363, 6454, 6932, 6983,
      5394, 3465, 9657, 4859, 2129, 2816, 2977, 3645, 5008, 977, 7307, 8414,
      1005, 4954, 917, 7883, 2970, 8897, 4823, 6610, 3462, 7391, 1800, 9186,
      761, 7764, 5562, 9953, 6271, 1525, 3262, 4489, 5864, 5006, 6861, 7897,
      5217, 6026, 2728, 3510, 3368, 3502, 9484, 6547, 7239, 3148, 7027, 7909,
      9673, 4112, 1350, 9542, 4722, 7653, 4433, 6825, 9287, 3139, 695, 4244,
      1153, 2, 6569, 9647, 5569, 3352, 5912, 5724, 4546, 3521, 8473, 6099, 1716,
    ]),
    145725293
  );
})();
function ae(a, b) {
  if (!eq(a, b)) {
    console.log("A:", a);
    console.log("B:", b);
    throw "Assertion Error";
  }
}
function ri(a, b) {
  return a + Math.floor((b - a + 1) * Math.random());
}
function eq(a, b) {
  if (a === b) return true;
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    return a.every((v, i) => eq(v, b[i]));
  }
  return false;
}

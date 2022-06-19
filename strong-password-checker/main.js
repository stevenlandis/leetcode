function strongPasswordChecker(pass) {
  if (sum(calcScore(pass)) === 0) {
    return 0;
  }
  const scoreCache = {};
  const stepCache = {};
  function getScore(pass) {
    if (pass in scoreCache) {
      return scoreCache[pass];
    }
    const score = sum(calcScore(pass));
    scoreCache[pass] = score;
    return score;
  }
  let bestDepth = undefined;
  function getSteps(pass, depth) {
    if (bestDepth !== undefined && depth >= bestDepth) {
      return 200;
    }
    if (getScore(pass) === 0) {
      console.log("solved");
      bestDepth = depth;
      return 0;
    }
    if (!(pass in stepCache)) {
      const choices = [];
      for (const testPass of getNextPasswords(pass)) {
        choices.push([testPass, getScore(testPass)]);
      }
      choices.sort((a, b) => a[1] - b[1]);

      let bestSteps = undefined;
      for (const [testPass] of choices) {
        const testSteps = getSteps(testPass, depth + 1);
        if (bestSteps === undefined || testSteps < bestSteps) {
          bestSteps = testSteps;
        }
      }
      // const bestSteps = getSteps(choices[0][0], depth + 1);
      stepCache[pass] = bestSteps + 1;
    }
    return stepCache[pass];
  }
  return getSteps(pass, 0);

  let count = 0;
  let stack = [pass];
  while (true) {
    const newStack = new Set();
    for (const p of stack) {
      for (const testPass of getSteps(p)) {
        const score = sum(getScore(testPass));
        if (score === 0) {
          return count + 1;
        }
        newStack.add(testPass);
      }
    }
    stack = Array(...newStack);
    count++;
  }
}

function underflow(pass) {
  return Math.max(0, 6 - pass.length);
}
function overflow(pass) {
  return Math.max(0, pass.length - 20);
}
function lowercase(pass) {
  for (const c of pass) {
    if ("a" <= c && c <= "z") {
      return 0;
    }
  }
  return 1;
}
function uppercase(pass) {
  for (const c of pass) {
    if ("A" <= c && c <= "Z") {
      return 0;
    }
  }
  return 1;
}
function digit(pass) {
  for (const c of pass) {
    if ("0" <= c && c <= "9") {
      return 0;
    }
  }
  return 1;
}
function repeating(pass) {
  let count = 0;
  let repeat = 1;
  let c = pass[0];
  for (let i = 1; i < pass.length; i++) {
    if (pass[i] !== c) {
      repeat = 0;
      c = pass[i];
    }
    repeat++;
    if (repeat > 2) {
      count++;
    }
  }
  return count;
}
function calcScore(pass) {
  return [
    underflow(pass),
    overflow(pass),
    lowercase(pass),
    uppercase(pass),
    digit(pass),
    repeating(pass),
  ];
}
function sum(l) {
  let s = 0;
  for (const x of l) {
    s += x;
  }
  return s;
}
function hasLower(pass) {
  for (const c of pass) {
    if ("a" <= c && c <= "z") {
      return true;
    }
  }
  return false;
}
function hasUpper(pass) {
  for (const c of pass) {
    if ("A" <= c && c <= "Z") {
      return true;
    }
  }
  return false;
}
function hasDigit(pass) {
  for (const c of pass) {
    if ("0" <= c && c <= "9") {
      return true;
    }
  }
  return false;
}
// const chars =
//   "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.!";
// const charSet = new Set(chars);
// function getNewChars(pass) {
//   const passSet = new Set(pass);
//   const res = [];
//   for (const c of "abcdefghijklmnopqrstuvwxyz") {
//     if (!passSet.has(c)) {
//       res.push(c);
//       break;
//     }
//   }
//   for (const c of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
//     if (!passSet.has(c)) {
//       res.push(c);
//       break;
//     }
//   }
//   for (const c of "0123456789") {
//     if (!passSet.has(c)) {
//       res.push(c);
//       break;
//     }
//   }
//   return res;
// }
function getNewChar(pass) {
  const passSet = new Set(pass);
  if (!hasLower(pass)) {
    return "a";
  }
  if (!hasUpper(pass)) {
    return "A";
  }
  if (!hasDigit(pass)) {
    return "0";
  }
  for (const c of "abcdefghijklmnopqrstuvwxyz") {
    if (!passSet.has(c)) {
      return c;
    }
  }
}
function getNextPasswords(pass) {
  const c = getNewChar(pass);
  const steps = [];
  if (pass.length < 20) {
    // insert
    for (let i = 0; i <= pass.length; i++) {
      steps.push(pass.slice(0, i) + c + pass.slice(i));
    }
  }
  if (6 <= pass.length && pass.length <= 20) {
    // replace
    for (let i = 0; i < pass.length; i++) {
      steps.push(pass.slice(0, i) + c + pass.slice(i + 1));
    }
  }
  if (pass.length > 20) {
    // delete
    for (let i = 0; i < pass.length; i++) {
      steps.push(pass.slice(0, i) + pass.slice(i + 1));
    }
  }
  return steps;
}

console.log(strongPasswordChecker("a") === 5);
console.log(strongPasswordChecker("aA1") === 3);
console.log(strongPasswordChecker("1337C0d3") === 0);
console.log(strongPasswordChecker("bbaaaaaaaaaaaaaaacccccc") === 8);

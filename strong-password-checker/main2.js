function strongPasswordChecker(pass) {
  let count = 0;
  while (true) {
    console.log(pass);
    const streaks = getStreaks(pass);
    if (
      6 <= pass.length &&
      pass.length <= 20 &&
      hasLower(pass) &&
      hasUpper(pass) &&
      hasDigit(pass) &&
      (streaks.length === 0 || streaks[0][1] < 3)
    ) {
      break;
    }
    pass = getNextPass(pass);
    count++;
  }
  return count;
}
function getNextPass(pass) {
  if (pass.length < 6) {
    // insert
    const c = getNewChar(pass);
    const streaks = getStreaks(pass);
    let i = undefined;
    for (const [start, len] of streaks) {
      if (len % 2 === 0) {
        i = start + 2;
        break;
      }
    }
    if (i === undefined) {
      for (const [start] of streaks) {
        i = start + 2;
        break;
      }
    }
    if (i === undefined) {
      i = 0;
    }
    return pass.slice(0, i) + c + pass.slice(i);
  }
  if (pass.length > 20) {
    // delete
    const streaks = getStreaks(pass);
    let i = undefined;
    for (const [start, len] of streaks) {
      if (len % 3 === 0) {
        i = start;
        break;
      }
    }
    if (i === undefined) {
      for (const [start, len] of streaks) {
        if (len % 3 === 1) {
          i = start;
          break;
        }
      }
    }
    if (i === undefined && streaks.length > 0) {
      i = streaks[0][0];
    }
    if (i === undefined) {
      i = getFirstReplacableChar(pass);
    }
    return pass.slice(0, i) + pass.slice(i + 1);
  }
  // replace
  const c = getNewChar(pass);
  const streaks = getStreaks(pass);
  let i = undefined;
  for (const [start, len] of streaks) {
    if (len > 4 && len % 3 === 1) {
      i = start + 2;
    }
  }
  if (i === undefined && streaks.length > 0) {
    const [start, len] = streaks[0];
    i = start + (len > 4 ? 2 : 1);
  }
  if (i === undefined) {
    i = getFirstReplacableChar(pass);
  }
  return pass.slice(0, i) + c + pass.slice(i + 1);
}
function getFirstReplacableChar(pass) {
  let lower = false;
  let upper = false;
  let digit = false;
  for (let i = 0; i < pass.length; i++) {
    const c = pass[i];
    if ("a" <= c && c <= "z") {
      if (!lower) {
        lower = true;
      } else {
        return i;
      }
    } else if ("A" <= c && c <= "Z") {
      if (!upper) {
        upper = true;
      } else {
        return i;
      }
    } else if ("0" <= c && c <= "9") {
      if (!digit) {
        digit = true;
      } else {
        return i;
      }
    }
  }
}
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
function getStreaks(pass) {
  // [start, length, char]
  const streaks = [];
  let ci = 0;
  let c = pass[0];
  let i = 1;
  while (true) {
    if (i === pass.length || pass[i] !== c) {
      if (i - ci > 1) {
        streaks.push([ci, i - ci, c]);
      }
      ci = i;
      c = pass[i];
    }
    if (i === pass.length) {
      break;
    }
    i++;
  }
  streaks.sort((a, b) => b[1] - a[1]);
  return streaks;
}

console.log(strongPasswordChecker("a") === 5);
console.log(strongPasswordChecker("aA1") === 3);
console.log(strongPasswordChecker("1337C0d3") === 0);
console.log(strongPasswordChecker("bbaaaaaaaaaaaaaaacccccc") === 8);
console.log(strongPasswordChecker("0abcde") === 1);
console.log(
  strongPasswordChecker("FFFFFFFFFFFFFFF11111111111111111111AAA") === 23
);
console.log(strongPasswordChecker("A1234567890aaabbbbccccc") === 4);
console.log(strongPasswordChecker("hoAISJDBVWD09232UHJEPODKNLADU1") === 10);

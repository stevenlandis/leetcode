function licenseKeyFormatting(s, k) {
  s = s.split("-").join("").toUpperCase();
  const res = [];
  const o = s.length % k;
  if (o > 0) {
    res.push(s.substr(0, o));
  }
  for (let i = o; i < s.length; i += k) {
    res.push(s.substr(i, k));
  }
  return res.join("-");
}

(() => {
  console.log(licenseKeyFormatting("5F3Z-2e-9-w", 4) === "5F3Z-2E9W");
  console.log(licenseKeyFormatting("2-5g-3-J", 2) === "2-5G-3J");
})();

function eq(a, b) {
  if (a === b) return true;
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    return a.every((v, i) => eq(v, b[i]));
  }
  return false;
}

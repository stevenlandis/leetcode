function suggestedProducts(products, searchWord) {
  products.sort();
  const root = makeTrie(products);
  const res = [];
  let node = root;
  for (const c of searchWord) {
    node = node === undefined ? undefined : node.sub[c];
    res.push(getN(node, 3).map((i) => products[i]));
  }
  return res;
}

function makeTrie(words) {
  const head = {
    final: -1,
    sub: {},
  };
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let node = head;
    for (const c of word) {
      if (!(c in node.sub)) {
        node.sub[c] = {
          final: -1,
          sub: {},
        };
      }
      node = node.sub[c];
    }
    node.final = i;
  }
  return head;
}

function getN(root, n) {
  const l = [];
  function helper(node) {
    if (node === undefined) return;
    if (l.length >= n) return;
    if (node.final !== -1) {
      l.push(node.final);
    }
    for (const c in node.sub) {
      helper(node.sub[c]);
    }
  }
  helper(root);
  return l;
}

(() => {
  console.log(
    eq(
      suggestedProducts(
        ["mobile", "mouse", "moneypot", "monitor", "mousepad"],
        "mouse"
      ),
      [
        ["mobile", "moneypot", "monitor"],
        ["mobile", "moneypot", "monitor"],
        ["mouse", "mousepad"],
        ["mouse", "mousepad"],
        ["mouse", "mousepad"],
      ]
    )
  );
  console.log(
    eq(suggestedProducts(["havana"], "havana"), [
      ["havana"],
      ["havana"],
      ["havana"],
      ["havana"],
      ["havana"],
      ["havana"],
    ])
  );
  console.log(
    eq(
      suggestedProducts(["bags", "baggage", "banner", "box", "cloths"], "bags"),
      [
        ["baggage", "bags", "banner"],
        ["baggage", "bags", "banner"],
        ["baggage", "bags"],
        ["bags"],
      ]
    )
  );
  console.log(
    eq(suggestedProducts(["havana"], "tatiana"), [[], [], [], [], [], [], []])
  );
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

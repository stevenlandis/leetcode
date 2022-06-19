function findRedundantDirectedConnection(edges) {
  for (let i = edges.length - 1; i >= 0; i--) {
    const te = [...edges];
    te.splice(i, 1);
    if (isRootedTree(te)) {
      return edges[i];
    }
  }
}
function isRootedTree(edges) {
  // find root
  const nodes = new Set();
  for (const [n0, n1] of edges) {
    nodes.add(n0);
    nodes.add(n1);
  }
  if (edges.length + 1 !== nodes.size) return false;
  const rs = new Set(nodes);
  for (const [n0, n1] of edges) {
    rs.delete(n1);
  }
  if (rs.size !== 1) return false;
  const [root] = [...rs];
  const em = new Map();
  for (const [n0, n1] of edges) {
    if (!em.has(n0)) {
      em.set(n0, []);
    }
    em.get(n0).push(n1);
  }
  const visited = new Set();
  function helper(node) {
    visited.add(node);
    if (em.has(node)) {
      for (const n1 of em.get(node)) {
        helper(n1);
      }
    }
  }
  helper(root);
  return nodes.size === visited.size;
}

(() => {
  ae(
    isRootedTree([
      [1, 2],
      [1, 3],
      [2, 3],
    ]),
    false
  );
  ae(
    isRootedTree([
      [1, 2],
      [1, 3],
      [2, 3],
    ]),
    false
  );
  ae(
    isRootedTree([
      [1, 2],
      [1, 3],
    ]),
    true
  );
  ae(
    isRootedTree([
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 1],
      [1, 5],
    ]),
    false
  );
  ae(
    isRootedTree([
      [1, 2],
      [2, 3],
      [3, 4],
      [1, 5],
    ]),
    true
  );
  ae(
    isRootedTree([
      [1, 2],
      [2, 3],
      [4, 1],
      [1, 5],
    ]),
    true
  );
  ae(
    isRootedTree([
      [1, 2],
      [3, 4],
      [4, 1],
      [1, 5],
    ]),
    true
  );
  ae(
    isRootedTree([
      [2, 3],
      [3, 4],
      [4, 1],
      [1, 5],
    ]),
    true
  );
  ae(
    isRootedTree([
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 1],
    ]),
    false
  );
  ae(
    findRedundantDirectedConnection([
      [1, 2],
      [1, 3],
      [2, 3],
    ]),
    [2, 3]
  );
  ae(
    findRedundantDirectedConnection([
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 1],
      [1, 5],
    ]),
    [4, 1]
  );
})();

function makeRandomInput(n) {
  let c = 1;
  const edges = [];
  function helper(ni) {
    while (c < n) {
      if (Math.random() < 0.5) break;
      c++;
      helper();
    }
    if (c === n) return;
    if (Math.random() < 0.5) {
      c++;
      edges.push([ni, c]);
    }
  }
  helper(1);
}

function ae(a, b) {
  if (!eq(a, b)) {
    console.log("A:", a);
    console.log("B:", b);
    throw "Assertion Error";
  }
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

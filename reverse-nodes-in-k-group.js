class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseKGroup(head, k) {
  const nodes = [];
  let n = head;
  while (n) {
    nodes.push(n.val);
    n = n.next;
  }
  const res = [...nodes];
  for (let i = 0; i + k <= nodes.length; i+=k) {
    for (let j = 0; j < k; j++) {
      res[i + k - 1 - j] = nodes[i + j];
    }
  }
  n = null;
  for (let i = res.length-1; i >= 0; i--) {
    n = new ListNode(res[i], n);
  }
  return n;
}

function listToNodes(l) {
  let n = null;
  for (let i = l.length-1; i >= 0; i--) {
    n = new ListNode(l[i], n);
  }
  return n;
}
function nodesToList(n) {
  const res = [];
  while (n) {
    res.push(n.val);
    n = n.next;
  }
  return res;
}

(() => {
  ae(nodesToList(reverseKGroup(listToNodes([1,2]), 2)), [2,1]);
  check([1,2],2,[2,1]);
  check([1,2,3,4,5],2,[2,1,4,3,5]);
  check([1,2,3,4,5],3,[3,2,1,4,5]);
})();
function check(a, k, b) {
  ae(nodesToList(reverseKGroup(listToNodes(a), k)), b);
}
function ae(a, b) {
  if (!eq(a, b)) {
    console.log("A:", a);
    console.log("B:", b);
    throw "Assertion Error";
  }
}
const pr = console.log;
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

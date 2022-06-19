function findSecondMinimumValue(root) {
  const vals = [];
  function helper(node) {
    if (node === null) {
      return;
    }
    vals.push(node.val);
    helper(node.left);
    helper(node.right);
  }
  helper(root);
  vals.sort((a, b) => a - b);
  const v0 = vals[0];
  for (let i = 1; i < vals.length; i++) {
    if (vals[i] !== v0) {
      return vals[i];
    }
  }
  return -1;
}

(() => {
  console.log(
    findSecondMinimumValue(Node(2, Node(2), Node(5, Node(5), Node(7)))) === 5
  );
  console.log(findSecondMinimumValue(Node(2, Node(2), Node(2))) === -1);
})();

function Node(val, left, right) {
  return new _TreeNode(val, left, right);
}
function _TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

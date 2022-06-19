function inorderTraversal(root) {
  const res = [];
  function helper(node) {
    if (node === undefined) return;
    helper(node.left);
    res.push(node.val);
    helper(node.right);
  }
  helper(root);
  return res;
}

(() => {
  console.log(
    inorderTraversal({
      left: { val: 1 },
      val: 2,
      right: { val: 3 },
    })
  );
})();

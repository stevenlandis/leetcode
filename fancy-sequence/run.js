function main() {
  run(
    [
      "Fancy",
      "append",
      "append",
      "multAll",
      "addAll",
      "append",
      "append",
      "getIndex",
      "multAll",
      "multAll",
      "getIndex",
      "getIndex",
      "addAll",
      "append",
      "append",
      "getIndex",
      "getIndex",
    ],
    [
      [],
      [3],
      [7],
      [4],
      [6],
      [7],
      [3],
      [3],
      [7],
      [5],
      [2],
      [3],
      [5],
      [8],
      [10],
      [1],
      [4],
    ]
  );
}

function run(cmds, vals) {
  let list = [];
  for (let i = 0; i < cmds.length; i++) {
    const cmd = cmds[i];
    const val = vals[i][0];
    if (cmd === "Fancy") {
      list = [];
    } else if (cmd === "append") {
      list.push(val);
    } else if (cmd === "addAll") {
      list = list.map((x) => x + val);
    } else if (cmd === "multAll") {
      list = list.map((x) => x * val);
    } else if (cmd === "getIndex") {
      console.log("got", val >= list.length ? -1 : list[val]);
    }
    console.log(list);
  }
}

main();

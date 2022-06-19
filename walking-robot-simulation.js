function robotSim(commands, obstacles) {
  const os = new Set(obstacles.map(([x, y]) => `${x} ${y}`));
  let x = 0;
  let y = 0;
  let dir = 1;
  let dist = 0;
  for (const cmd of commands) {
    switch (cmd) {
      case -2:
        dir = (dir + 1) % 4;
        break;
      case -1:
        dir = (((dir - 1) % 4) + 4) % 4;
        break;
      default: {
        const [dx, dy] = ds[dir];
        for (let i = 0; i < cmd; i++) {
          if (os.has(`${x + dx} ${y + dy}`)) {
            break;
          }
          x += dx;
          y += dy;
        }
        dist = Math.max(dist, x * x + y * y);
        break;
      }
    }
  }
  return dist;
}
const ds = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

(() => {
  console.log(robotSim([4, -1, 4, -2, 4], [[2, 4]]) === 65);
})();

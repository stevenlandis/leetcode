const { xgcd, Fancy, modInverse } = require("./index.js");

function main() {
  // testXGcd();
  // testModInv();
  // testModDiv();
  test(Fancy);
  // test(Fancy);
}

function test(clss) {
  (() => {
    const i = new clss();
    i.append(2);
    i.addAll(3);
    i.append(7);
    i.multAll(2);
    assert(i.getIndex(0) === 10);
    i.addAll(3);
    i.append(10);
    i.multAll(2);
    assert(i.getIndex(0) === 26);
    assert(i.getIndex(1) === 34);
    assert(i.getIndex(2) === 20);
  })();

  (() => {
    const i = new clss();
    assert(i.getIndex(0) === -1);
    i.append(5);
    assert(i.getIndex(0) === 5);
  })();
}

function testXGcd() {
  (() => {
    for (let i = 0; i < 1000; i++) {
      const a = randInt(1000);
      const b = randInt(1000);
      const [x, y, g] = xgcd(a, b);
      if (a * x + b * y !== g) {
        console.log("failed on", a, b);
      }
    }
  })();
}

function testModInv() {
  (() => {
    for (let i = 0; i < 1000; i++) {
      const b = randInt(1000);
      const m = randInt(1000);
      const bi = modInverse(b, m);
      if ((bi * b) % m !== 1) {
        console.log("failed on", b, m, bi);
      }
    }
  })();
}

function testModDiv() {
  (() => {
    function modDiv(a, b, m) {
      for (let x = 0; x < m; x++) {
        if ((a * x) % m === b % m) {
          console.log("found");
          return x;
        }
      }
      console.log(a, b, m);
      assert(false);
    }

    for (let i = 0; i < 1000; i++) {
      const a = randInt(1000);
      const y = randInt(1000);
      const m = randInt(1000);
      modDiv(a, y, m);
    }
  })();
}

function randInt(N) {
  return Math.floor(N * Math.random());
}
function assert(cond) {
  if (!cond) {
    throw new Error();
  }
}

main();

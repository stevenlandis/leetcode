const MOD = 1e9 + 7;
// class Fancy0 {
//   constructor() {
//     this.list = [];
//   }
//   append(val) {
//     this.list.push(val);
//   }
//   addAll(inc) {
//     this.list = this.list.map((x) => x + inc);
//   }
//   multAll(m) {
//     this.list = this.list.map((x) => m * x);
//   }
//   getIndex(i) {
//     return i >= this.list.length ? -1 : this.list[i];
//   }
// }

function xgcd(a, b) {
  if (b == 0) {
    return [1, 0, a];
  }
  const [x, y, d] = xgcd(b, a % b);
  return [y, x - y * Math.floor(a / b), d];
}

function modInverse(b, m) {
  const [x, y, g] = xgcd(b, m);
  if (g != 1) return -1;
  return ((x % m) + m) % m;
}
function posMod(x, m) {
  return ((x % m) + m) % m;
}
function add(a, b) {
  return posMod(a + b, MOD);
}
function sub(a, b) {
  return posMod(a - b, MOD);
}
function mul(a, b) {
  return Number((BigInt(a) * BigInt(b)) % BigInt(MOD));
  return posMod(BigInt(a) * BigInt(b), MOD);
}
function div(a, b) {
  const inv = modInverse(b, MOD);
  return mul(a, inv);
}

class Fancy {
  constructor() {
    this.list = [];
    this.m = 1;
    this.b = 1;
  }
  append(val) {
    this.list.push({
      val,
      m: this.m,
      b: this.b,
    });
  }
  addAll(inc) {
    this.b = add(this.b, inc);
  }
  multAll(m) {
    this.m = mul(this.m, m);
    this.b = mul(this.b, m);
  }
  getIndex(i) {
    return i >= this.list.length
      ? -1
      : add(
          mul(
            div(this.m, this.list[i].m),
            sub(this.list[i].val, this.list[i].b)
          ),
          this.b
        );
  }
}

// exports.Fancy = Fancy;
// exports.Fancy1 = Fancy1;
// exports.xgcd = xgcd;
// exports.modInverse = modInverse;

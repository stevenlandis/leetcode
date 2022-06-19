class AllOne {
  constructor() {
    this.minHeap = new MinHeapMap();
    this.maxHeap = new MinHeapMap();
  }
  inc(key) {
    if (!this.minHeap.has(key)) {
      this.minHeap.set(key, 1);
    } else {
      const val = this.minHeap.get(key);
      this.minHeap.set(key, val + 1);
    }
    if (!this.maxHeap.has(key)) {
      this.maxHeap.set(key, -1);
    } else {
      const val = this.maxHeap.get(key);
      this.maxHeap.set(key, val - 1);
    }
  }
  dec(key) {
    this.minHeap.set(key, this.minHeap.get(key) + 1);
    this.maxHeap.set(key, this.maxHeap.get(key) - 1);
  }
  getMaxKey() {
    return this.maxHeap.getMin().key;
  }
  getMinKey() {
    return this.minHeap.getMin().key;
  }
}
class MinHeapMap {
  constructor() {
    this.size = 0;
    this.list = [];
    this.indexMap = new Map();
  }
  // public functions
  set(key, value) {
    if (this.indexMap.has(key)) {
      // update existing
      const i = this.indexMap.get(key);
      this.list[i].value = value;
      if (this.size > 1) {
        this._swap(i, this.size);
        this._heapifyUp(this.size);
      }
    } else {
      // add new
      this.list[this.size + 1] = { key, value };
      this.indexMap.set(key, this.size + 1);
      this.size++;
      this._heapifyUp(this.size);
    }
  }
  has(key) {
    return this.indexMap.has(key);
  }
  get(key) {
    return this.list[this.indexMap.get(key)].value;
  }
  getMin() {
    return this.list[1];
  }

  // private functions
  _swap(i, j) {
    this.indexMap.set(this.list[i].key, j);
    this.indexMap.set(this.list[j].key, i);
    const temp = this.list[i];
    this.list[i] = this.list[j];
    this.list[j] = temp;
  }
  _heapifyUp(i) {
    if (i < 1 || i > this.size) {
      return;
    }
    if (i === 1) {
      return;
    }
    const parentI = Math.floor(i / 2);
    if (this.list[i].value < this.list[parentI].value) {
      this._swap(i, parentI);
      this._heapifyUp(parentI);
    }
  }
  _heapifyDown(i) {
    if (i < 1 || i > this.size) {
      return;
    }
    const leftI = 2 * i;
    if (leftI <= this.size) {
      const rightI = 2 * i + 1;
      if (rightI <= this.size) {
        if (this.list[leftI].value < this.list[rightI].value) {
          if (this.list[leftI].value < this.list[i].value) {
            this._swap(i, leftI);
            this._heapifyDown(leftI);
          }
        } else {
          if (this.list[rightI].value < this.list[i].value) {
            this._swap(i, rightI);
            this._heapifyDown(rightI);
          }
        }
      } else {
        if (this.list[leftI].value < this.list[i].value) {
          this._swap(i, leftI);
          this._heapifyDown(leftI);
        }
      }
    }
  }
}

(() => {
  {
    const allOne = new AllOne();
    allOne.inc("hello");
    allOne.inc("hello");
    ae(allOne.getMaxKey(), "hello"); // return "hello"
    ae(allOne.getMinKey(), "hello"); // return "hello"
    allOne.inc("leet");
    ae(allOne.getMaxKey(), "hello"); // return "hello"
    ae(allOne.getMinKey(), "leet"); // return "leet"
  }
  for (let i = 0; i < 1000; i++) {}
})();
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

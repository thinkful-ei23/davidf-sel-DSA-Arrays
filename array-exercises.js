import memory from './memory';

class Array {
  constructor() {
    this.length = 0;
    this.ptr = memory.allocate(this.length);
  }
  push(value) {
    this._resize(this.length + 1);
    memory.set(this.ptr + this.length, value);
    this.length++;
  }
  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
  }
}

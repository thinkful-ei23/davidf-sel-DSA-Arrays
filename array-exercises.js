'use strict';

const memoryClass = require('./memory');
const Memory = new memoryClass();

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = Memory.allocate(this.length);
  }

  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    Memory.set(this.ptr + this.length, value);
    this.length++;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = Memory.allocate(size);
    if (this.ptr === null) {
      throw new Error('Out of memory');
    }
    Memory.copy(this.ptr, oldPtr, this.length);
    Memory.free(oldPtr);
    this._capacity = size;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    return Memory.get(this.ptr + index);
  }

  pop() {
    if (this.length === 0) {
      throw new Error('Index error');
    }
    const value = Memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    Memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    Memory.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    Memory.copy(
      this.ptr + index,
      this.ptr + index + 1,
      this.length - index - 1
    );
    this.length--;
  }
}
Array.SIZE_RATIO = 3;

function main() {
  Array.SIZE_RATIO = 3;

  let arr = new Array();
  arr.push('tauhida');
  arr.push(3);
  // arr.push(5);
  // arr.push(15);
  // arr.push(19);
  // arr.push(45);
  // arr.push(10);

  // arr.pop();
  // arr.pop();
  // arr.pop();
  // console.log(arr);
  // console.log(arr.get(0));
  arr.remove();

  // console.log(arr);
  // console.log(arr.get(0));
}

main();

//What is the length, capacity and memory address of your array?
//Array { length: 1, _capacity: 3, ptr: 0 }

//What is the length, capacity and memory address of your array?
//Array { length: 6, _capacity: 12, ptr: 3 }
/*Array became longer and with a larger capacity when pushing items
 to it. The ptr moved because it still had the memory of the first one
 stored. */

//What is the length, capacity and memory address of your array?
//Array { length: 3, _capacity: 12, ptr: 3 }
/* The length shortened because we removed the last three parts of the
 array but the rest stayed the same since the memory was still allocated.
*/

//When I tried to print "Tauhida" it returned NaN, I'm not sure why.

//What's the purpose of the _resize() function in your Array class?
/* To reallocate memory based on the size of the array */

// function urlify(str) {
//   console.log(str.replace(/ /g, '%20'));
// }

// let input = 'www.thinkful.com /tauh ida parv een';

// urlify(input);

// function filterArr(arr, search) {
//   let newArray = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] !== search) {
//       newArray.push(arr[i]);
//     }
//   }
//   return newArray;
// }

// let arr = [1, 2, 3, 4, 'bob'];

// console.log(filterArr(arr, 'bob'));

// function maxSum(arr) {
//   let high = -Infinity;
//   let current = 0;
//   for (let i = 0; i < arr.length; i++) {
//     current = current + arr[i];
//     if (current > high) {
//       high = current;
//     }
//   }
//   console.log(high);
// }

// maxSum([4, 6, -3, 5, -2, 1]);

// function mergeArr(arr1, arr2) {
//   let i = 0;
//   let j = 0;
//   let result = [];

//   while (i < arr1.length && j < arr2.length) {
//     if (arr1[i] <= arr2[j]) {
//       result.push(arr1[i]);
//       i++;
//     } else {
//       result.push(arr2[j]);
//       j++;
//     }
//   }

//   while (i < arr1.length) {
//     result.push(arr1[i]);
//     i++;
//   }

//   while (j < arr2.length) {
//     result.push(arr2[j]);
//     j++;
//   }

//   console.log(result);
// }

// mergeArr([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]);

// function removeChars(str, rep) {
//   let re = new RegExp(rep.split('').join('|'), 'g');
//   console.log(str.replace(re, ''));
// }

// let input1 = 'Battle of the Vowels: Hawaii vs. Grozny';
// let input2 = 'aeiou';

// removeChars(input1, input2);

// function products(arr) {
//   let arrayProduct = arr.reduce(function(product, value) {
//     return product * value;
//   }, 1);

//   return arr.map(value => {
//     return arrayProduct / value;
//   });
// }

// console.log(products([1, 3, 9, 4]));

// function zeroOneArray(arr) {
//   const newArr = [];

//   for (let i = 0; i < arr.length; i++) {
//     newArr.push([]);
//     for (let j = 0; j < arr[i].length; j++) newArr[i].push(arr[i][j]);
//   }

//   for (let i = 0; i < arr.length; i++) {
//     for (let j = 0; j < arr[i].length; j++) {
//       if (arr[i][j] === 0) {
//         for (let n = 0; n < arr.length; n++) {
//           newArr[n][j] = 0;
//         }
//         for (let m = 0; m < arr[i].length; m++) {
//           newArr[i][m] = 0;
//         }
//       }
//     }
//   }

//   return newArr;
// }

// console.log(
//   zeroOneArray([
//     [1, 0, 1, 1, 0],
//     [0, 1, 1, 1, 0],
//     [1, 1, 1, 1, 1],
//     [1, 0, 1, 1, 1],
//     [1, 1, 1, 1, 1]
//   ])
// );

function isStringRotation(str1, str2) {
  if (str1.length !== str2.length) return false;

  let isMatch = true;

  for (let offset = 0; offset < str1.length; offset++) {
    isMatch = true;
    for (let i = 0; i < str1.length; i++) {
      if (str1[i] !== str2[(i + offset) % str1.length]) isMatch = false;
    }

    if (isMatch === true) return true;
  }

  return false;
}

console.log(isStringRotation('amazon', 'azonma'));
console.log(isStringRotation('amazon', 'azonam'));

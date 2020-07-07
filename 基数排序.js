// 基数排序

const counter = [];
function radixSort(arr, maxDigit) {
  let mod = 10;
  let dev = 1;

  for (let index = 0; index < maxDigit; index++, dev *= 10, mod *= 10) {
    for (let j = 0; j < arr.length; j++) {
      let bucket = parseInt((arr[j] % mod) / dev);
      console.log('bucket :', bucket);
      if (counter[bucket] == null) {
        counter[bucket] = [];
      }

      counter[bucket].push(arr[j]);
    }

    let pos = 0;
    for (let j = 0; j < counter.length; j++) {
      let value = null;

      if (counter[j] != null) {
        while ((value = counter[j].shift()) != null) {
          arr[pos++] = value;
        }
      }
    }
  }

  return arr;
}

const arr = [1, 4, 5, 2, 11, 22, 12, 14, 17, 22, 66, 21, 42];
console.log("original :", arr);
console.time("x");
console.log("selectionSort :", radixSort(arr, 2));
console.timeEnd("x");

// 希尔排序
function shellSort(arr) {
  const len = arr.length;
  let temp,
    gap = 1;
  while (gap < len / 3) {
    gap = gap * 3 + 1;
  }

  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < len; i++) {
      temp = arr[i];
      let j = i - gap
      for (j; j > 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j];
      }
      arr[j + gap] = temp;
    }
  }
  return arr;
}


const arr = [1, 4, 5, 2, 11, 22, 12, 14, 17, 22, 66, 21,42]
console.log('original :', arr);
console.log('selectionSort :', shellSort(arr));
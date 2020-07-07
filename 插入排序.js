// 插入排序
function insertionSort(arr) {
  const len = arr.length;
  let preIndex, current;
  for (let i = 1; i < len; i++) {
    preIndex = i - 1;
    current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }

  return arr;
}


const arr = [1, 4, 5, 2, 11, 22, 12, 14, 17, 22, 66, 21,42]
console.log('original :', arr);
console.log('selectionSort :', insertionSort(arr));
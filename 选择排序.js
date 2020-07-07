// 选择排序
function selectionSort(arr) {
  const len = arr.length;
  let minIndex, temp;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }

  return arr;
}

const arr = [1, 4, 5, 2, 11, 22, 12, 14, 17, 22, 66, 21,42]
console.log('original :', arr);
console.log('selectionSort :', selectionSort(arr));
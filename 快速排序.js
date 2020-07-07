// 快速排序
function quickSort(arr, left, right) {
  const len = arr.length;
  let partitionIndex;
  let leftInner = typeof left != "number" ? 0 : left;
  let rightInner = typeof right != "number" ? len - 1 : right;

  if (leftInner < rightInner) {
    partitionIndex = partition(arr, leftInner, rightInner);
    quickSort(arr, leftInner, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, rightInner);
  }

  return arr;
}

function partition(arr, left, right) {
  //分区操作
  const pivot = left;
  let index = pivot + 1;

  for (let i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index);
      index++;
    }
  }

  swap(arr, pivot, index - 1);

  return index - 1;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}


const arr = [1, 4, 5, 2, 11, 22, 12, 14, 17, 22, 66, 21,42]
console.log('original :', arr);
console.time('x');
console.log('selectionSort :', quickSort(arr, null, null));
console.timeEnd('x');
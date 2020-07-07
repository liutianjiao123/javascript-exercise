// 堆排序
let len;

function buildMaxHeap(arr) {
    len = arr.length;

    for (let i = Math.floor(len / 2); i >= 0 ; i--) {
        heapify(arr, i);
    }
}

function heapify(arr, index) {
    let left = 2 * index + 1,
        right = 2 * index + 2,
        largest = index;

    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest != index) {
        swap(arr, index , largest);
        heapify(arr, largest);
    }
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function heapSort(arr) {
    buildMaxHeap(arr);

    for (let index = arr.length - 1; index > 0; index--) {
        swap(arr, 0, index);
        len--;
        heapify(arr, 0);
    }

    return arr;
}


const arr = [1, 4, 5, 2, 11, 22, 12, 14, 17, 22, 66, 21,42]
console.log('original :', arr);
console.time('x');
console.log('selectionSort :', heapSort(arr, null, null));
console.timeEnd('x');
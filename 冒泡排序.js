// 冒泡排序

function maopao(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j +1]) {
                let temp = arr[j + 1];
                arr[j + 1] = arr[j]
                arr[j] = temp
            }
            
        }
    }

    return arr;
}

const arr = [1, 4, 5, 2, 11, 22, 12, 14, 17, 22, 66, 21,42]
console.log('original :', arr);
console.time('x');
console.log('maopao :', maopao(arr));
console.timeEnd('x');
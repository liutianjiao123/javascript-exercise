// 归并排序
function mergeSort(arr) {
    const len = arr.length;
    if (len < 2) {
        return arr;
    }

    let middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);


    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {  
    let result = [];
    console.log('21-left :', left);
    console.log('22-right :', right);
    
    
    while (left.length && right.length) {
        if(left[0] <= right[0]){
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }

    }

    while(left.length) {
        result.push(left.shift());
    }

    while(right.length) {
        result.push(right.shift());
    }

    return result;
}

const arr = [1, 4, 5, 2, 11, 22, 12, 14, 17, 22, 66, 21,42]
console.log('original :', arr);
console.time('x');
console.log('selectionSort :', mergeSort(arr));
console.timeEnd('x');

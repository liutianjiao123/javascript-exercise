/*
* 数组中两个数的和为目标数
* 返回索引数组
*
* */
/**
 *
 * @Params: number[]
 * @Return: num[]
 */
function num(num, target) {
    var temp = [];
    for (var i = 0; i < num.length; i++) {
        var tep = target - num[i]; // 求出另一个和数
        console.log('tep: ' + tep);
        console.log('temp[tep]: ' + temp[tep]);
        if (temp[tep] !== undefined) { // 去除空值
            console.log('lllllllll');
            return [temp[tep], i];
        }
        temp[num[i]] = i; // 将第一个和数的索引存入临时数组中
        console.log('temp[num[i]]: ' + temp[num[i]]);
    }
}
var nums = [3, 2, 4];
console.log(num(nums, 6));

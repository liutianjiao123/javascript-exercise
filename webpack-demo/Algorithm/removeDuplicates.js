/*
 * 删除数组中重复项
 * 条件：给定一个有序数组，你需要使用原地算法删除重复项，使得每一个元素只出现一次，返回移除后的数组的新长度和数组。
 * 不使用额外的数组空间，你必须使用原地算法修改输入数组并在使用O(1)额外空间的条件下完成。
 * */
var removeDuplicates = function (nums) {
    var ans = 0;
    // const tempArr = nums.sort((a,b) => a - b); // 升序
    var tempArr = nums.sort(function (a, b) { return b - a; }); // 降序
    for (var i = tempArr.length; i--;) {
        console.log(i);
        if (i === tempArr.length - 1) { // 循环到数组最后一个值
            ans++;
            console.log('ans:' + ans);
        }
        else if (tempArr[i] === tempArr[i + 1]) { // 如果数组中当前值与下一个值相等则删除下一个值
            console.log(tempArr[i] + '---15');
            console.log(tempArr[i + 1] + '---16');
            tempArr.splice(i, 1);
        }
        else { // 如果当前值和下一个值不重复，则数组长度加1
            ans++;
        }
    }
    return { ans: ans, tempArr: tempArr };
    /*
     我的答案：
     for (let i = 0; i < nums.length; i++) {
     ans = nums[i];
     for (let j = i + 1; j < nums.length; j++) {
     if (ans === nums[j]) {
     delete nums[j]; // delete方法只能删除数组中的值，但是内存仍然被空值占用
     }
     }
     }
     return nums.length;
     */
};
// const numsArr = [1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 6, 7];
var numsArr = [1, 11, 1, 2, 12, 3, 3, 14, 4, 15, 6, 7];
var result = removeDuplicates(numsArr);
console.log(result);

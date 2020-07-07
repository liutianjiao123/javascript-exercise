// relationHook 是个钩子函数，用于得到关系得分
var relationHook = {
    "xijinping": 1000,   
    "ligang": 100,
    "pengdehuai": 50,
　　 // 新的考生只需要在钩子里添加关系分
}
 
// 考生分数以及父亲名
function examinee(name, score, fatherName) {
    return {
        name: name,
        score: score,
        fatherName: fatherName
    };
}
  
// 审阅考生们
function judge(examinees) {
    var result = {};
    for (var i in examinees) {
        var curExaminee = examinees[i];
        var ret = curExaminee.score;
        if (relationHook[curExaminee.fatherName] ) {
            ret += relationHook[curExaminee.fatherName] ;
        }
        result[curExaminee.name] = ret;
    }
    return result;
}
  
  
var lihao = examinee("lihao", 10, 'ligang');
var xida = examinee('xida', 8, 'xijinping');
var peng = examinee('peng', 60, 'pengdehuai');
var liaoxiaofeng = examinee('liaoxiaofeng', 100, 'liaodaniu');
  
var result = judge([lihao, xida, peng, liaoxiaofeng]);
console.log(result);
let arr = [];
// 根据分数选取前三名
// 然后
for (var name in result) {
    console.log("name:" + name);
    console.log("score:" + result[name]);
    if(result.hasOwnProperty(name) === false) {
        console.log('111111'+ name + result[name]);
    }
    var res = {};
    res.name = name;
    res.score = result[name];

    arr.push(res);
}

console.log(arr);

var a = 123;
var b = '';
var c = 321
var foo = a || b ||c;
var fee = c && b;
var bar = a && (b && c);
if(b) {
    fee = c;
} else {
    fee = b;
}

console.log(foo);
console.log(fee);
console.log(bar);

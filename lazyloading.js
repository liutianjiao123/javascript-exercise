var img = document.getElementsByTagName("img");
console.log(img);
var n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历
lazyload(); //页面载入完毕加载可是区域内的图片
// 节流函数，保证每200ms触发一次
function throttle(event, time) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        event.apply(this, args);
      }, time);
    }
  }
}
window.addEventListener('scroll', throttle(lazyload, 200))
function lazyload() { //监听页面滚动事件
  var seeHeight = window.innerHeight; //可见区域高度
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度
  for (var i = n; i < img.length; i++) {
    console.log(img[i].offsetTop, seeHeight, scrollTop);
    if (img[i].offsetTop < seeHeight + scrollTop) {
      if (img[i].getAttribute("src") == "loading.gif") {
        img[i].src = img[i].getAttribute("data-src");
      }
      n = i + 1;
    }
  }
}
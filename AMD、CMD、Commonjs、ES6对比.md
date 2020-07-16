## Commonjs、AMD、CMD、ES6对比

#### 1、Commonjs

##### 基本概念

+ 是一种为JS的表现指定的规范，它希望js可以运行在任何地方，更多的说的是服务端模块规范，Node.js采用了这个规范。

##### 核心思想

+ 一个单独文件就是一个模块，通过require方法来同步加载要依赖的模块，然后通过extports或则module.exports来导出需要暴露的接口。

```js
require('module');
require('../file.js');

exports.doStuff = function() {};
module.exports = someValue;
```

##### 优点

+ 服务器端模块重用
+ npm模块包众多
+ 简单易用

###### 缺点

+ 模块同步加载，只能加载完成后再使用，即用到哪个模块，现加载现用
+ 加载速度慢，从而导致性能、可用性、调试、跨域访问等问题

##### 实现

+ 服务器端的nodejs
+ Browserify，浏览器端的CommonJs实现，可以使用NPM的模块，但是编译打包后的文件体积可能很大
+ modules-webmake，类似Browserify，但是不如后者灵活
+ wreq，Browserify的前身

##### 浏览器端为什么不适用？

+ 同步加载意味着阻塞加载，浏览器端资源一般都是异步加载的
+ AMD、CMD较适用

##### nodejs为什么采用？

+ nodejs主要是服务器端编程，模块一般都存在本地，加载速度较快，无需考虑异步加载的方式，因此commonjs比较使用。

----



#### 2.AMD

##### 基本定义

+ [Asynchronous Module Definition](https://github.com/amdjs/amdjs-api) 规范其实只有一个主要接口 `define(id?, dependencies?, factory)`，它要在声明模块的时候指定所有的依赖 `dependencies`，并且还要当做形参传到 `factory` 中，对于依赖的模块提前执行，依赖前置。

```js
define("module", ["dep1", "dep2"], function(d1, d2) {
  return someExportedValue;
});
require(["module", "../file"], function(module, file) { /* ... */ });
```



##### 优点

+ 适合浏览器环境中的异步加载模块
+ 可以并行加载多个模块

##### 缺点

+ 增加了开发成本，代码阅读和书写比较困难，模块定义方式的语义不够顺畅
+ 不符合通用的模块话思维方式，是一种妥协的实现

##### 实现

+ RequireJs
+ curl

----

#### CMD

##### 基本定义

+ [Common Module Definition](https://github.com/cmdjs/specification/blob/master/draft/module.md) 规范和 AMD 很相似，尽量保持简单，并与 CommonJS 和 Node.js 的 Modules 规范保持了很大的兼容性。

```js
define(function(require, exports, module) {
  var $ = require('jquery');
  var Spinning = require('./spinning');
  exports.doSomething = ...
  module.exports = ...
})
```

##### 优点

+ 依赖就近，延迟执行
+ 可以很容易在Nodejs中运行

##### 缺点

+ 依赖SPM打包，模块的加载逻辑偏重

##### 实现

+ Sea.js
+ coolie

---

#### UMD

##### 基本定义

+ [Universal Module Definition](https://github.com/umdjs/umd) 规范类似于兼容 CommonJS 和 AMD 的语法糖，是模块定义的跨平台解决方案。

---

#### ES6模块

##### 基本定义

+ ECMAScript6 标准增加了 JavaScript 语言层面的模块体系定义。[ES6 模块](http://es6.ruanyifeng.com/#docs/module)的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。

```js
import "jquery";
export function doStuff() {}
module "localModule" {}
```



##### 优点

+ 易于进行静态分析
+ 面向未来的ES标准

##### 缺点

+ 原生浏览器端还没有实现该标准
+ 全新的命令字，新版的Nodejs才支持

##### 实现

+ Babel

https://zhaoda.gitbooks.io/webpack/content/amd.html




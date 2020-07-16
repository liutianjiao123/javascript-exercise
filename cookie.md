#### cookie

##### 主要内容

- 名称：Cookie唯一的名称，必须经过URL编码处理。（同名会出现覆盖的情况）
- 值：必须经过URL编码处理。
- 域（domain）：默认情况下cookie在当前域下有效，你也可以设置该值来确保对其子域是否有效。
- 路径（path）：指定Cookie在哪些路径下有效，默认是当前路径下。
- 失效时间（expires）：默认情况下，浏览器会话结束时会自动删除Cookie；也可以设置一个GMT格式的日期，指定具体的删除日期；如果设置的日期为以前的日期，那么Cookie会立即删除。
- 安全标志（secure）：指定之后只允许Cookie发送给https协议。

+ expires/max-age
  + 若不设置过期时间，则表示此cookie的生命周期为浏览器会话期间，关闭浏览器窗口，cookie就会删除。
  + 此种生命周期为浏览器会话期的cookie成为会话cookie（session cookie）。会话cookie一般不存储在硬盘中，而是保存在内存中。
+ path
+ domain
  + 路径和域一个构成cookie的作用范围。

```js
Set-Cookie: "name=value; expires=Tue, 03-Sep-2019 14:10:21 GMT; path=/; domain=.xxx.com;"
```



#### cookie 和session的区别

+ 存储位置不同
  + cookie数据存储在客户端上，服务器可以知道其中的信息
  + session数据存储在服务器上，客户端不知道其中的信息

+ 安全性
  + cookie不如session安全，cookie存储在客户端，可以被分析进而进行伪装，并向服务器发送请求，不重要且需要保留的信息可以放在cookie中
  + session数据存储在服务器上，客户端不知道其中的信息，因此登录信息等重要信息应存储在session中，
+ 存储数据容量
  + 单个cookie保存的数据不能超过4k，同时很多浏览器限制cookie存储个数不能超过20个
  + sessionStorage和localStorage虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大 
+ 存放的数据内容
  + cookie存储的是字符串
  + session存储的是对象

+ 数据访问限制
  + cookie设置有访问路径参数，同一个网站中不同路径下的cookie相互是访问不到的
  + session不能区分路径，同一个用户访问一个网站期间，所有的session在任何一个地方都是可以访问到的
+ 工作方式
  + session需要配合cookie才能使用，如果客户端完全禁止cookie，session将无效。
+ 跨域访问
  + cookie支持跨域访问，但是不支持跨域调用
  + session不支持跨域访问，其仅在他所在的域名内有效

仅运用Cookie或者仅运用Session可能完成不了理想的效果。这时应该尝试一下同时运用Cookie与Session。Cookie与Session的搭配运用在实践项目中会完成很多意想不到的效果。

#### webStorage和cookie的区别

+ webStorage可以减少网络流量：
  + cookie每次请求一个新的页面都需要被发送到服务器，浪费流量
  + webStorage数据一旦保存到本地，就可以避免再向服务器请求数据，因此可以减少不必要的数据请求，同时减少数据在浏览器和服务器间不必要的来回传递
+ webStorage可以快速显示数据：
  + 性能好，从本地读数据比通过网络从服务器上获得数据快得多，本地数据可以及时获得，再加上网页本身也可以有缓存，因此整个页面和数据都在本地的话，可以立即显示 

#### sessionStorage、localStorage和cookie的区别

共同点：都是保存在浏览器端、且同源的 
区别： 
1、cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递，而sessionStorage和localStorage不会自动把数据发送给服务器，仅在本地保存。cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下 
2、存储大小限制也不同，cookie数据不能超过4K，同时因为每次http请求都会携带cookie、所以cookie只适合保存很小的数据，如会话标识。sessionStorage和localStorage虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大 
3、数据有效期不同，sessionStorage：仅在当前浏览器窗口关闭之前有效；localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；cookie：只在设置的cookie过期时间之前有效，即使窗口关闭或浏览器关闭 
4、作用域不同，sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；localstorage在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的 
5、web Storage支持事件通知机制，可以将数据更新的通知发送给监听者 
6、web Storage的api接口使用更方便


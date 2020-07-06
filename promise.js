/**
 * 1. new Promise时，需要传递一个 executor 执行器，执行器立刻执行
 * 2. executor 接受两个参数，分别是 resolve 和 reject
 * 3. promise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled
 * 4. promise 的状态一旦确认，就不会再改变
 * 5. promise 都有 then 方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled,
 *      和 promise 失败的回调 onRejected
 * 6. 如果调用 then 时，promise已经成功，则执行 onFulfilled，并将promise的值作为参数传递进去。
 *      如果promise已经失败，那么执行 onRejected, 并将 promise 失败的原因作为参数传递进去。
 *      如果promise的状态是pending，需要将onFulfilled和onRejected函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)
 * 7. then 的参数 onFulfilled 和 onRejected 可以缺省
 * 8. promise 可以then多次，promise 的then 方法返回一个 promise
 * 9. 如果 then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功的回调(onFulfilled)
 * 10. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)
 * 11.如果 then 返回的是一个promise,那么需要等这个promise，那么会等这个promise执行完，promise如果成功，
 *   就走下一个then的成功，如果失败，就走下一个then的失败
 */

// (function (window) {
  const PENGING = "pending";
  const FULLFILLED = "fullfilled";
  const REJECTED = "rejected";

  function Promise(executor) {
    const self = this;
    self.state = PENGING;
    self.onFullfilled = []; // 成功的回调
    self.onRejected = []; // 失败的回调

    function resolve(value) {
      if (self.state === FULLFILLED) {
        return;
      }

      if (self.state === PENGING) {
        self.state = FULLFILLED;
        self.value = value;
        self.onFullfilled.forEach((fn) => fn());
      }
    }

    function reject(reason) {
      if (self.state === REJECTED) {
        return;
      }

      if (self.state === PENGING) {
        self.state = REJECTED;
        self.reason = reason;
        self.onRejected.forEach((fn) => fn());
      }
    }

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}

  Promise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled =typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =typeof onRejected === "function"? onRejected: (reason) => {throw reason;};
    const self = this;

    const promise2 = new Promise((resolve, reject) => {
      if (self.state === FULLFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if (self.state === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if (self.state === PENGING) {
        self.onFullfilled.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(self.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });

        self.onRejected.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(self.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });

    return promise2;
  };

  function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      reject(new TypeError("Chaining cycle"));
    }

    if ((x && typeof x === "object") || typeof x === "function") {
      let used;
      try {
        let then = x.then;
        if (typeof then === "function") {
          then.call(x,
            (v) => {
              if (used) {
                return;
              }
              used = true;
              resolvePromise(promise2, v, resolve, reject);
            },
            (r) => {
              if (used) {
                return;
              }
              used = true;
              reject(r);
            }
          );
        } else { // 当传入值的then属性不是函数，而是对象
          if (used) return;
          used = true;
          resolve(x);
        }
      } catch (error) {
        if (used) {
          return;
        }
        used = true;
        reject(error);
      }
    } else {
      resolve(x);
    }
  }

  Promise.prototype.catch = function (onRejected) {
    const self = this;
    return self.then(null, onRejected);
  };

  Promise.prototype.finally = function (cb) {
    const self = this;
    return self.then(
      (value) => {
        return Promise.resolve(cb()).then(() => value);
      },
      (reason) => {
        return Promise.resolve(cb()).then(() => {
          throw reason;
        });
      }
    );
  };

  Promise.resolve = function (value) {
    if (value instanceof Promise) {
      return value;
    }

    return new Promise((resolve, reject) => {
      if (value && value.then && typeof value.then === "function") {
        setTimeout(() => {
          value.then(resolve, reject);
        });
      } else {
          resolve(value)
      }
    });
  };

  Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  };

  Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
      let index = 0;
      let results = [];
      if (promises.length === 0) {
        resolve(results);
      } else {
        function processValue(i, data) {
          results[i] = data;
          if (++index === promises.length) {
            resolve(results);
          }
        }

        for (let i = 0; i < promises.length; i++) {
          // promises[i] 可能是普通值
          Promise.resolve(promises[i]).then(
            (data) => {
              processValue(i, data);
            },
            (reason) => {
              reject(reason);
              return;
            }
          );
        }
      }
    });
  };

  Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
      if (promises.length === 0) {
        return;
      } else {
        for (let i = 0; i < promises.length; i++) {
          Promise.resolve(promises[i]).then(
            (data) => {
              resolve(data);
              return;
            },
            (reason) => {
              reject(reason);
              return;
            }
          );
        }
      }
    });
  };

  module.exports = Promise;
//   window.Promise = Promise;
// })(window);

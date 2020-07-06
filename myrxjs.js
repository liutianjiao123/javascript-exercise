const { observable } = require("rxjs");

(function (w) {
  function Observable(subscribe) {
    this._subscribe = subscribe;
  }

  Observable.prototype.subscribe = function (observer) {
    const self = this;
    const defaultObserver = {
      next: () => {},
      error: () => {},
      complete: () => {},
    };

    if (typeof observer === "function") {
      return self._subscribe({ ...defaultObserver, next: observer });
    } else {
      return self._subscribe({...defaultObserver, ...observer});
    }
  };

  Observable.prototype.pipe = function(...operation) {
    // return operation(this);
    return operation.reduce((prev, fn) => fn(prev), this);
  }

  function tap(fn) {
    return (observable) => {
      new Observable(observer => {
        observable.subscribe({
          next: val => {
            fn(val);
            observer.next(val);
          },
          error: err => observer.error(err),
          complete: () => observer.complete()
        });
      })
    }
  }
  
  function take(num) {
    return (observable) => {
      new Observable(observer => {
        let times = 0;
        const subscription = observable.subscribe({
          next: val => {
            times++;
            if (num >= times) {
              observer.next(val);
            } else {
              observer.complete();
              subscription.unsubscribe();
            }
          },
          error: err => observer.error(err),
          complete: () => observer.complete()
        });
      })
    }
  }

  function merge(...observables) {
    return (observable) => {
      let completeNum = 0;
      if (observable) {
        observables = [observable, ...observables];
      }
      return new Observable(observer => {
        observables.forEach(observable => {
          observable.subscribe({
            next: val => observer.next(val),
            error: err => {
              observables.forEach(observable.unsubscribe());
              observer.error(err);
            },
            complete: () => {
              completeNum++;
              if(completeNum === observables.length) {
                observer.complete();
              }
            },
          });
        });
      });
    }
  }

  function of(...args) {
    return new Observable((observer) => {
      args.forEach((arg) => {
        observer.next(arg);
      });
      observer.complete();

      return {
        unsubscribe: () => {}
      }
    });

 
  }

  function interval(delay) {
    return new Observable(observer => {
      let index = 0;
      const time = setInterval(() => {
        observer.next(index++);
      }, delay);

      return {
        unsubscribe: () => clearInterval(time)
      }
    })
  }

  function timer(delay) {
    return new Observable(observer => {
      const time = setTimeout(() => {
        observer.next(0);
      }, delay);

      return {
        unsubscribe: () => clearTimeout(time)
      }
    })
  }

  function from(param) {
    if (Array.isArray(param)) {
      return new Observable(observer => {
        param.forEach(val => observer.next(val));
        observer.complete();
      })
    }
    return new Observable(observer => {
      let cancelled = false;
      Promise.resolve(param)
      .then(val => {
        observer.next(val);
        observer.complete();
      })
      .catch(e => {
        observer.error(e);
      });
      return {
        unsubscribe: () => {cancelled = true;}
      }
    })
  }

  function fromEvent(element, event) {
    return new Observable(observer => {
      const handler = e => observer.next(e);
      element.addEventListener(event, handler);
      return {
        unsubscribe: () => element.removeEventListener(event, handler)
      };
    })
  }

  function map(fn) {
    return new Observable(observer => {
      this.subscribe({
        next: val => observer.next(fn(val)),
        error: err => observer.error(err),
        complete: () => observer.complete(),
      });
    });
  }

  function filter(fn) {
    return new Observable(observer => {
      this.subscribe({
        next: val => fn(val) ? observer.next(val): () =>{},
        error: err => observer.error(err),
        complete: () => observer.complete(),
      });
    });
  }

  w.Observable = Observable;
  w.of = of;
  w.interval = interval;
  w.timer = timer;
  w.from = from;
  w.fromEvent = fromEvent;
  w.tap = tap;
  w.take = take;
})(window);

const PENDING = 'pending'; // 等待
const FULFILLED = 'fulfilled' // 成功
const REJECTED = 'rejected' // 失败

class MyPromise {
  constructor (executor) {
    executor(this.resolve, this.reject);
  }

  // promise 状态
  status = PENDING;

  // 成功之后的值
  value = undefined;

  // 失败之后的原因
  reason = undefined;

  // 成功回调集合
  successCallbackList = [];

  // 失败回调集合
  failCallbackList = [];

  resolve = value => {
    // 如果状态不是等待
    if (this.status !== PENDING) {
      return;
    }
    // 将状态更改为成功
    this.status = FULFILLED;
    // 保存成功之后的值
    this.value = value;
    // 判断成功回调是否存在 如果存在 调用
    while(this.successCallbackList.length) {
      this.successCallbackList.shift()(this.value);
    }
  }

  reject = reason => {
    // 如果状态不是等待
    if (this.status !== PENDING) {
      return;
    }
    // 将状态更改为失败
    this.status = REJECTED;
    // 保存失败之后的原因
    this.reason = reason;
    // 判断失败回调是否存在 如果存在 调用
    while(this.failCallbackList.length) {
      this.failCallbackList.shift()(this.reason);
    }
  }

  then (successCallback, failCallback) {
    let newPromise = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status === FULFILLED) {
        setTimeout(() => {
          let x = successCallback(this.value);
          resolvePromise(newPromise, x, resolve, reject);
        }, 0);
      } else if (this.status === REJECTED) {
        let failReason = failCallback(this.reason);
        reject(failReason);
      } else {
        // 等待
        // 将成功回调、失败回调存储起来
        this.successCallbackList.push(successCallback);
        this.failCallbackList.push(failCallback);
      }
    });
    return newPromise;
  }
}

function resolvePromise (newPromise, x, resolve, reject) {
  // 防止循环调用
  if (newPromise === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }

  // 判断 x 的值是普通值还是promise对象
  // 如果是普通值 直接调用resolve
  // 如果是promise对象 查看promise对象返回的结果
  // 再根据promise对象返回的结果 决定调用resolve 还是调用reject

  if (x instanceof MyPromise) {
    // promise 对象
    x.then(resolve, reject);
  } else {
    // 普通对象
    resolve(x);
  }
}

module.exports = MyPromise;
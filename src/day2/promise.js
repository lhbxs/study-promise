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

  // 成功回调
  successCallback = undefined;

  // 失败回调
  failCallback = undefined;

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
    this.successCallback && this.successCallback(this.value);
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
    this.failCallback && this.failCallback(this.reason);
  }

  then (successCallback, failCallback) {
    // 判断状态
    if (this.status === FULFILLED) {
      successCallback(this.value);
    } else if (this.status === REJECTED) {
      failCallback(this.reason);
    } else {
      // 等待
      // 将成功回调、失败回调存储起来
      this.successCallback = successCallback;
      this.failCallback = failCallback;
    }
  }
}

module.exports = MyPromise;
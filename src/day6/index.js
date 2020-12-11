/**
  1. Promise 就是一个类 在执行这个类的时候 需要传递一个执行器进去 执行器会立即执行
  2. Promise 中有三种状态 分别为 成功 fulfilled 失败 rejected 等待 pending
    pedding -> fulfilled
    pending -> rejected
    一旦状态确定就不可更改
  3. resolve和reject函数是用来更改状态的
    resolve: fulfilled
    reject: rejected
  4. then方法内部做的事情就是判断状态 如果状态是成功 调用成功的回调函数 如果是失败 调用失败的回调函数
  5. then成功回调有一个参数 表示成功之后的值 then失败回调有一个参数 表示失败后的原因
 */

const MyPromise = require('./promise.js');

const promise = new MyPromise((resolve, reject) => {
  resolve('成功');
  // reject('失败');
});

function other () {
  return new MyPromise((resolve) => {
    resolve('other')
  });
}

let p1 = promise.then((value) => {
  console.log('success', value);
  return p1;
})

p1.then(value => {
  console.log(value);
}, reason => {
  console.log(reason.message);
})
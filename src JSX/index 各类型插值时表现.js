import React from 'react';
import ReactDOM from 'react-dom';

/*
* 在 JSX 内容中，不同类型的值的表现
*   字符串、数字：原样输出
*   布尔值、空、未定义 会被忽略
*   复杂类型：
*     数组: 忽略掉，后拼接输出
*     对象：不能再内容中输出（报错）
*/

// let title = 'hello React';
// let title = [1, 2, 3];
let title = {
  val: 'hello React'
}

let header = (
  <header id="header" className="header">
    <h1>{title.val}</h1>
    <p>这是副标题</p>
  </header>
)

ReactDOM.render(
  header,
  document.querySelector('#root')
)
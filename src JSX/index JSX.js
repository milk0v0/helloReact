import React from 'react';
import ReactDOM from 'react-dom';

let title = 'hello React';
let header = (
  <header id="header" className="header">
    <h1>{title}</h1>
    <p>这是副标题</p>
  </header>
)

/*
* JSX：JS的语法糖，可以在 JavaScript 中编写 XML
* 
* JSX 注意事项：
*   1. 注意 JSX 并不是 html，也不是字符串
*   2. 标签名全部都要小写
*   3. 组件名首字母大写
*   4. 它可以配合 JavaScript 表达式一起使用
*/

/*
* JSX 插值表达式：
*   注意插值表达式中，接收的是一个 JS 表达式
* JS 表达式：运行之后有一个值的运算就叫做表达式；变量、运算、函数调用
*/

ReactDOM.render(
  header,
  document.querySelector('#root')
)
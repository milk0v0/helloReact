import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

/*
* JSX 注意事项：
*   1. 注意 JSX 并不是 html，也不是字符串
*   2. 标签名全部都要小写
*   3. 组件名首字母大写
*   4. 它可以配合 JavaScript 表达式一起使用
*   5. JSX 中有些属性编写时有特殊写法：
*     class、style
*   6. 所有标签必须要闭合，哪怕是单标签
*   7. JSX 中必须有一个顶层包含容器
*     如果不想输出这个包含容器，可以使用 Fragment/<></>
*     Fragment/<></> 文档碎片，将不会在真实 DOM 输出
*   8. 列表渲染时，必须有 key 值
*/

let classname = 'header';
let _style = {
  width: 100,
  borderBottom: '1px solid #000',
  color: '#999'
}

let header = (
  <Fragment>
    <header id="header" className={classname} style={_style}>
      <h1>标题</h1>
      <p>这是副标题</p>
    </header>
  </Fragment>
)

ReactDOM.render(
  header,
  document.querySelector('#root')
)
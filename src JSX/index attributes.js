import React from 'react';
import ReactDOM from 'react-dom';

/*
* JSX 中的表达式也可以使用在属性上，但是使用的时候需要注意
*   当在属性中使用 {} 的时候，不要使用引号包含
* style 的值 必须是一个对象 否则不识别
*/

let classname = 'header';
let _style = {
  width: 100,
  borderBottom: '1px solid #000',
  color: '#999'
}

let header = (
  <header id="header" className={classname} style={_style}>
    <h1>标题</h1>
    <p>这是副标题</p>
  </header>
)

ReactDOM.render(
  header,
  document.querySelector('#root')
)
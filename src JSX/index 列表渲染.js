import React from 'react';
import ReactDOM from 'react-dom';

/*
* 在 JSX 内容中，不同类型的值的表现
*   字符串、数字：原样输出
*   布尔值、空、未定义 会被忽略
*   复杂类型：
*     数组: 忽略掉，后拼接输出
*     对象：不能再内容中输出（报错）
*   条件渲染：
*     || 、 && 、 ?
*   复杂情况渲染：
*     借助函数
*/

// let title = 'hello React';
// let title = [1, 2, 3];
let data = [{
  id: 1,
  val: '列表项1'
}, {
  id: 2,
  val: '列表项2'
}, {
  id: 3,
  val: '列表项3'
}];

let data2 = [{
  id: 4,
  val: '列表项A'
}, {
  id: 5,
  val: '列表项B'
}, {
  id: 6,
  val: '列表项C'
}];

// let dataList = [
//   <li>列表项1</li>,
//   <li>列表项2</li>,
//   <li>列表项3</li>
// ]

function setInner() {
  let newData = [...data, ...data2];
  newData = newData.filter(item => item.id % 2);
  newData.sort((a, b) => b.id - a.id);

  return newData.map(item => <li key={item.id}>{item.val}</li>)
}

let ul = (
  <ul>
    {/* {dataList} */}
    {/* {data.map(item => <li key={item.id}>{item.val}</li>)} */}
    {setInner()}
  </ul>
)

ReactDOM.render(
  ul,
  document.querySelector('#root')
)
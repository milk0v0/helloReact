import React from 'react'

import Child from './Child';

/*
* 函数式组件
*   return 返回我们要构建的视图
* 在 React 16.7 之前，函数式组件没有 state 也没有生命周期，所以也被称为 无状态组件 | 纯渲染组件
* 常用 Hooks - 钩子函数
*   useState(initialState)
*/

export default function App() {
    return (
        <div>
            <h1>Hello React</h1>
            <Child content="你好~" />
        </div>
    )
}
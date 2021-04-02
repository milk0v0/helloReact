import React, { useState } from 'react'

import Child from './Child';

/*
* 函数式组件
*   return 返回我们要构建的视图
* 在 React 16.7 之前，函数式组件没有 state 也没有生命周期，所以也被称为 无状态组件 | 纯渲染组件
* 常用 Hooks - 钩子函数
*   useState(initialState)
*       const [state, setState] = useState(initialState);
*       let [状态,修改该状态的方法] = useState(初始值);
*       在同一个组件中可以使用 useState 定义多个状态
*       注意 useState 返回的 setState 方法同样是异步方法
* useEffect
*   useEffect(() => {
*       // 副作用函数
*       return () => {
*           // 副作用函数的返还函数
*       }
*   }, [依赖参数])
*   依赖参数：监听对应参数修改时，或组件挂载时执行
*       不写依赖参数时，只要组件更新就会执行 副作用函数
*       当 依赖参数 [] 时，副作用函数只在挂载完之后执行
*
*       挂载阶段
*           render -> 副作用函数
*       更新阶段
*           render -> 返回函数（即将更新） -> 完成更新（副作用函数）
*       卸载阶段
*           返回函数（即将卸载）
*
*/

export default function App() {
    const [show, setShow] = useState(true)
    return (
        <div>
            {show && <Child content="你好~" />}
            <button onClick={()=>(setShow(!show))}>安装/卸载</button>
        </div>
    )
}
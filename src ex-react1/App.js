import React, { Component } from 'react';
import './index.css';

import List from './List'
import data from './data.json'

/*
* 1. 建立静态视图
* 2. 拆分组件
* 3. 关联数据
* 4. 处理状态
* 
* 父组件向子组件传递信息
*   props
*   在父级中调用子组件时，可以将要传递内容，添加在子组件属性中
*/

class App extends Component {
    render() {
        return (
            <ul id="menu">
                {data.map((item, index) => <List key={index} data={item}></List>)}
            </ul>
        )
    }
}

export default App;
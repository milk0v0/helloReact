import React, { Component } from 'react';
import Child from './Child';

/*
* 在 React.js 中，数据是从上自下流动（传递）的，也就是一个父组件可以把它的 state / props 通过 props 传递给它的子组件，但是子组件不能修改 props - React.js 是单向数据流，如果子组件需要修改父组件状态（数据），是通过回调函数方式来完成的
* 
* 组件间通信
*   组件之间进行信息传递
*       父传子：
*           父组件调用子组件时，把数据添加子组件的属性中，然后子组件中从 props 属性中，获取父级传递过来的数据
*       子传父：
*           没有
*           在父级中定义相关的数据操作方法(或其他回调), 把该方法传递给子级，在子级中调用该方法父级传递消息
*       兄传弟：
*           将数据托管给父级上，然后分别传给子级
*   
*/

class App extends Component {
    state = {
        name: 'milk'
    }
    setName = newName => {
        this.setState({
            name: newName
        })
    }
    render() {
        let { name } = this.state;
        return (
            <div>
                <Child name={name} setName={this.setName}></Child>
            </div>
        )
    }
}

export default App;
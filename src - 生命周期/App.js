import React, { Component } from 'react';
import Child from './Child';

/*
* 所谓的生命周期就是指某个事物从开始到结束的各个阶段，当然在 React.js 中指的是组件从创建到销毁的过程，React.js 在这个过程中的不同阶段调用的函数，通过这些函数，我们可以更加精确的对组件进行控制，前面我们一直在使用的 render 函数其实就是组件生命周期渲染阶段执行的函数
*
* 组件的生命周期
*   挂载阶段（组件从创建、挂载到真实 DOM 中） - mount
*       constructor(props) 组件的初始化
*       static getDerivedStateFromProps(props) 
*       render
*       componentDidMount -- 处理副作用(请求)
*   更新阶段（组件开始更新一只到真实 DOM 更新完成）
*       static getDerivedStateFromProps(props) - 将 props 中的某些数据关联到状态中
*       shouldComponentUpdate() -- 判断是否跟新
*       render()
*       getSnapshotBeforeUpdate() 
*       componentDidUpdate() -- 处理副作用(请求)
*   卸载阶段（销毁组件）
*       componentWillUnmount - 删除添加在全局的一些信息或操作
*/

class App extends Component {
    state = {
        name: 'milk',
        isShow: true
    }
    setName = newName => {
        this.setState({
            name: newName
        })
    }
    render() {
        let { name, isShow } = this.state;
        return (
            <div>
                {isShow ? <Child name={name} setName={this.setName}></Child> : '卸载了'}
                <button onClick={() => {
                    this.setState({
                        isShow: !isShow
                    })
                }}>isShow</button>
            </div>
        )
    }
}

export default App;
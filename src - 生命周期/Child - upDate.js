import React, { Component } from 'react'

export default class Child extends Component {
    state = {
        count: 1
    }
    // 将 props 中的某些数据关联到状态中
    static getDerivedStateFromProps(props) {
        // 将对应的数据添加到 state 中
        console.log(0, '将 props 关联至 state');
        return {
            name: props.name
        }
    }
    // 控制组件是否更新
    shouldComponentUpdate(nextProps, nextState) {
        console.log(1, '控制组件是否更新');
        // nextProps - 更新之后的 props
        // this.props - 更新之前的 props

        // nextState - 更新之后的 state
        // this.state - 更新之前的 state

        return true // true 继续更新流程，进行组件更新，false 打断更新流程，不再继续更新
    }
    // 获取更新前的 DOM 快照
    getSnapshotBeforeUpdate(prevProps, prevState) {
        // 获取更新前的 DOM 快照：在这一步组件即将去更新视图（真实 DOM），我们可以获取更新前的 DOM 树状态
        console.log(3, '获取并返回更新前的 DOM 快照');
        let count = document.querySelector('#count');
        return count.innerHTML
    }
    // 组件更新完成
    componentDidUpdate(prevProps, prevState, prevDOM) {
        console.log(4, '组件更新完成');
        let count = document.querySelector('#count');
        console.log(prevDOM);
        console.log(count);
    }
    render() {
        console.log(2, '调用 render 方法，根据 render 的返回值，生成虚拟 DOM');
        let { name, count } = this.state;
        let { setName } = this.props;
        return (
            <div>
                <p id="name">name: {name}</p>
                <p id="count">count: {count}</p>
                <button onClick={() => {
                    this.setState({
                        count: count + 1
                    })
                }}>递增</button>
                <button onClick={() => {
                    setName('牛奶')
                }}>中文名</button>
            </div>
        )
    }
}
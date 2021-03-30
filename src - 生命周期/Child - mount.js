import React, { Component } from 'react'

export default class Child extends Component {
    constructor(props) {
        console.log(0, '初始化组件');
        super(props);
        this.state = {
            count: 1
        }
    }
    // 将 props 中的某些数据关联到状态中
    static getDerivedStateFromProps(props) {
        // 将对应的数据添加到 state 中
        console.log(1, '将 props 关联至 state');
        return {
            name: props.name
        }
    }
    // 组件挂载完成，如果要获取真实 DOM，在该方法中获取
    componentDidMount() {
        console.log(3, '组件挂载完成');
        console.log(document.querySelector('#name'));
    }
    render() {
        console.log(2, '调用 render 方法，根据 render 的返回值，生成虚拟 DOM');
        let { name, count } = this.state;
        let { setName } = this.props;
        return (
            <div>
                <p id="name">name: {name}</p>
                <p>count: {count}</p>
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
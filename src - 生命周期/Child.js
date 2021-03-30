import React, { Component } from 'react'

export default class Child extends Component {
    state = {
        count: 1,
        size: window.innerWidth
    }
    componentDidMount() {
        window.onresize = () => {
            this.setState({
                size: window.innerWidth
            })
        };
    }
    // 组件即将卸载
    componentWillUnmount() {
        console.log(0, '组件即将卸载');
        window.onresize = null;
    }
    render() {
        let { name, count, size } = this.state;
        let { setName } = this.props;
        return (
            <div>
                <p id="name">name: {name}</p>
                <p id="count">count: {count}</p>
                <p>size: {size}</p>
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
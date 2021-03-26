import React, { Component } from 'react'

export default class Child extends Component {
    state = {
        count: 1
    }
    render() {
        let { count } = this.state;
        let { name, setName } = this.props;
        return (
            <div>
                <p>name: {name}</p>
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
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './index.css';

// 子组件中有一个属性叫做 props，通过 props 可以接收父级传递过来的信息

class List extends Component {
    state = {
        show: false
    }
    render() {
        let { data } = this.props;
        let { name, children } = data;
        let { show } = this.state;
        return (
            <li className={show ? "subList-show" : ""}>
                <a onClick={() => {
                    this.setState({
                        show: !show
                    })
                }}>{name}</a>
                <ul className="subList">
                    {children.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </li>
        )
    }
}

export default List;
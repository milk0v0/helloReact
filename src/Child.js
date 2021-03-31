import React, { Component } from 'react'

export default class Child extends Component {
    render() {
        const { child1, child2 } = this.props;
        return (
            <div>
                {child1}
                {child2}
            </div>
        )
    }
}
import React, { Component } from 'react'

import SubChild from './SubChild'

export default class Child extends Component {
    render() {
        // return <SubChild {...this.props}></SubChild>
        return <SubChild></SubChild>
    }
}
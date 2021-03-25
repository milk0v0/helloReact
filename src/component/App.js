import React, { Component } from 'react';

/*
* 1. 使用类组件时，必须继承自 React.Component
* 2. 类组件必须有一个 react 方法，在 render 的 return 中定义该组件要构建的视图
*/

class App extends Component {
    render() {
        return <div>这是内容</div>
    }
}

export default App;